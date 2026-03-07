'use client';
import { RangeSlider } from '@/components/shared/range-slider';
import { Button } from '@/components/ui/button';
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
    <div className="max-w-107.5 w-full mx-auto px-4 py-5 bg-black/2">
      <div className="bg-white py-3 rounded-sm">
        <div className="w-50 mx-auto text-center">
          <h3 className="text-[14px] font-bold leading-3 mb-2">MyPropertyBot</h3>
          <p className="font-light leading-2 text-[10px]">мини-приложение</p>
        </div>
      </div>
      <div className="flex flex-col bg-white py-5 rounded-sm mt-5 px-5">
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
      </div>
    </div>
  );
}
