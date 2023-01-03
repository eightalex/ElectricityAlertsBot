import {CalendarEvent} from '../../../../types/CalendarEvent';

export const exampleIcs =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//phntm.live//ua-shutdown-calendar-group_3//EN
NAME:Відключення електропостачання
X-WR-CALNAME:Відключення електропостачання
X-WR-CALDESC:Календар відключень електропостачання
BEGIN:VEVENT
UID:955b164d-441d-40cb-9fac-0940d859d7f4
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230103T070000Z
DTEND:20230103T110000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT
BEGIN:VEVENT
UID:755abe42-0cae-4e48-87d6-5f79fe9b3794
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230103T160000Z
DTEND:20230103T200000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT
BEGIN:VEVENT
UID:c1101eb6-fbcd-4026-a01d-d30b807778aa
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230104T010000Z
DTEND:20230104T050000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT
BEGIN:VEVENT
UID:ce927892-64cd-4489-b56e-40e10b284494
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230104T100000Z
DTEND:20230104T140000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT
BEGIN:VEVENT
UID:464c0d6e-40b7-4aac-a7ae-cf94ae0c81bb
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230104T190000Z
DTEND:20230104T220000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT
BEGIN:VEVENT
UID:05ced6b2-8051-4956-83ca-5ad5275c9c95
SEQUENCE:0
DTSTAMP:20230103T094924Z
DTSTART:20230104T220000Z
DTEND:20230104T230000Z
SUMMARY:Планове відключення
URL;VALUE=URI:https://www.dtek-kem.com.ua/ua/shutdowns
LAST-MODIFIED:20230103T094924Z
END:VEVENT`;

export const parsedIcs: CalendarEvent[] = [
    {
        start: new Date('2023-01-03 07:00 Z'),
        end: new Date('2023-01-03 11:00 Z'),
    },
    {
        start: new Date('2023-01-03 16:00 Z'),
        end: new Date('2023-01-03 20:00 Z'),
    },
    {
        start: new Date('2023-01-04 01:00 Z'),
        end: new Date('2023-01-04 05:00 Z'),
    },
    {
        start: new Date('2023-01-04 10:00 Z'),
        end: new Date('2023-01-04 14:00 Z'),
    },
    {
        start: new Date('2023-01-04 19:00 Z'),
        end: new Date('2023-01-04 22:00 Z'),
    },
    {
        start: new Date('2023-01-04 22:00 Z'),
        end: new Date('2023-01-04 23:00 Z'),
    },
];
