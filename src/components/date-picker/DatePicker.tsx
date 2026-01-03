import { useMemo, useState } from "react";
import { leapYear } from "@/utils/leapYearChecker";
import { Field, FieldGroup } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DatePickerProps = {
  onChange: (value: string) => void;
};

export default function DatePicker({ onChange }: DatePickerProps) {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");

  const daysInMonth = useMemo(() => {
    if (!year || !month) return 31;
    if (month === 2) return leapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  }, [year, month]);

  const emitChange = (y: number, m: number, d: number) => {
    onChange(
      `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
    );
  };

  return (
    <FieldGroup>
      <div className='gap-4 grid grid-cols-3'>
        <Field>
          <Select
            value={year === "" ? "" : year.toString()}
            onValueChange={(v) => {
              const y = +v;
              setYear(y);
              setMonth("");
              setDay("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='YYYY' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 80 }, (_, i) => {
                const y = currentYear - i;
                return (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Select
            value={month === "" ? "" : month.toString()}
            disabled={!year}
            onValueChange={(v) => {
              const m = +v;
              setMonth(m);
              setDay("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='MM' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Select
            value={day === "" ? "" : day.toString()}
            disabled={!month}
            onValueChange={(v) => {
              const d = +v;
              setDay(d);
              if (year && month) emitChange(year, month, d);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='DD' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FieldGroup>
  );
}
