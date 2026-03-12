import TelegramBot from 'node-telegram-bot-api';
import prisma from '@/lib/client';

import dotenv from 'dotenv';

dotenv.config();
console.log(Object.keys(prisma));

const token = process.env.BOT_TOKEN || '';
const bot = new TelegramBot(token, { polling: true });

console.log('✅ Бот запущен и ожидает сообщений...');

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id.toString();
  const telegramId = msg.from?.id?.toString();

  const firstName = msg.from?.first_name;
  const lastName = msg.from?.last_name;
  const username = msg.from?.username;

  if (!telegramId) return;
  try {
    await prisma.user.upsert({
      where: { telegramId },
      update: { chatId: chatId.toString() },
      create: {
        telegramId,
        chatId,
        firstName,
        lastName,
        username,
      },
    });

    await bot.sendMessage(chatId, 'Привет! Я могу найти квартиру мечты', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🔍 Создать фильтр',
              web_app: { url: `${process.env.APP_URL || 'http://localhost:3000'}/filter/new` },
            },
            {
              text: '📋 Мои фильтры',
              web_app: { url: `${process.env.APP_URL || 'http://localhost:3000'}/filters` },
            },
          ],
        ],
      },
    });

    console.log(`✅ Ответ отправлен пользователю ${telegramId}`);
  } catch (error) {
    console.error('❌ Ошибка в /start:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
  }
});

bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }

  if (msg.web_app_data) {
    try {
      const data = JSON.parse(msg.web_app_data.data);
      console.log('📱 Данные из Mini App:', data);

      if (data.action === 'create_filter') {
        const user = await prisma.user.findUnique({
          where: { telegramId: msg.from?.id?.toString() },
        });

        if (!user) {
          await bot.sendMessage(msg.chat.id, '❌ Пользователь не найден. Напишите /start');
          return;
        }

        await prisma.filter.create({
          data: {
            userId: user.id,
            name: data.name || 'Мой фильтр',
            type: data.type || 'rent',
            criteria: data.criteria || {},
            isActive: true,
          },
        });

        await bot.sendMessage(msg.chat.id, '✅ Фильтр успешно создан!');
        console.log(`✅ Фильтр создан для пользователя ${user.telegramId}`);
      }
    } catch (error) {
      console.error('❌ Ошибка обработки Web App данных:', error);
      await bot.sendMessage(msg.chat.id, '❌ Произошла ошибка при создании фильтра');
    }
  }
});

bot.on('polling_error', (error) => {
  console.error('⚠️ Polling error:', error);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('👋 Бот остановлен');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('👋 Бот остановлен');
  process.exit(0);
});

export default bot;
