import { useState, useMemo } from "react";
import { leapYear } from "@/utils/leapYearChecker";
import { Field, FieldGroup } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DatePicker() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  const daysInMonth = useMemo(() => {
    if (!year || !month) return 31;

    if (month === 2) {
      return leapYear(year) ? 29 : 28;
    }

    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  }, [year, month]);

  // YYYY-MM-DD (HTML date input format)
  const birthDate =
    year && month && day
      ? `${String(year)}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`
      : "";

  return (
    <FieldGroup>
      <div className='gap-4 grid grid-cols-3'>
        <Field>
          <Select onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger id='year'>
              <SelectValue placeholder='YYYY' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 80 }, (_, i) => {
                const y = currentYear - i;
                return (
                  <SelectItem key={y} value={`${y}`}>
                    {y}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <Select disabled={!year} onValueChange={(v) => setMonth(Number(v))}>
            <SelectTrigger id='month'>
              <SelectValue placeholder='MM' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Select disabled={!month} onValueChange={(v) => setDay(Number(v))}>
            <SelectTrigger id='day'>
              <SelectValue placeholder='DD' />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      {/* Hidden form field */}
      <input name='birthDate' type='date' value={birthDate} readOnly hidden />
    </FieldGroup>
  );
}
