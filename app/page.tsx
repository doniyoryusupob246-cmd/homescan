'use client';
import { RangeSlider } from '@/components/shared/range-slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const rooms = ['1', '2', '3', '4', '5+'];

export default function Home() {
  const [isActiveBtn, setIsActiveBtn] = React.useState<string[]>([]);
  const toggleRoom = (room: string) => {
    setIsActiveBtn((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room],
    );
  };
  return (
    <div className="max-w-107.5 w-full mx-auto px-4 pt-5">
      <div className="bg-black/2 py-3 rounded-sm">
        <div className="w-50 mx-auto text-center">
          <h3 className="text-[14px] font-bold leading-3 mb-2">MyPropertyBot</h3>
          <p className="font-light leading-2 text-[10px]">мини-приложение</p>
        </div>
      </div>
      <div className="flex flex-col bg-black/2 py-5 rounded-sm mt-5 px-5">
        <div className="border rounded-full border-black py-1 px-3 w-[200px] text-center  mx-auto">
          <p className="text-[16px]">Создать фильтр</p>
        </div>

        <RadioGroup className="flex gap-5 justify-center mt-8" defaultValue="Аренда квартир">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Аренда квартир" id="Аренда квартир" />
            <Label htmlFor="Аренда квартир">Аренда квартир</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Аренда домов" id="Аренда домов" />
            <Label htmlFor="Аренда домов">Аренда домов</Label>
          </div>
        </RadioGroup>

        <div className="flex justify-between items-center max-w-[430px] w-full mt-10">
          <h3 className="font-medium">Район</h3>
          <Select>
            <SelectTrigger className="w-[280px] rounded-full border-2">
              <SelectValue placeholder="Выберите район" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-10 w-full pb-7">
          <div className="mb-4">
            <h3 className="font-medium">Цена ($)</h3>
          </div>

          <div className="w-[80%] mx-auto">
            <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
          </div>
        </div>

        <div>
          <h3 className="font-medium">Комнаты</h3>
          <div className="flex justify-between mt-2">
            {rooms.map((room, i) => (
              <Button
                onClick={() => toggleRoom(room)}
                key={room}
                variant={isActiveBtn.includes(room) ? 'default' : 'outline'}
                className="w-[50px] h-[50px]">
                {room}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-medium mb-2">Площадь (м)</h3>
          <Input placeholder="От" className="h-[40px] mb-3 rounded-full  border-2" />
          <Input placeholder="До" className="h-[40px] rounded-full border-2" />
        </div>
      </div>
      <div className="flex items-center justify-center mb-3 gap-2 w-[230px] mx-auto cursor-pointer">
        <p className="text-[12px]">Дополнительные параметры</p>
        <ChevronDown size={13} />
      </div>
      <div>
        <Button className="w-full h-[40px] rounded-full">Сохранить</Button>
      </div>
    </div>
  );
}
