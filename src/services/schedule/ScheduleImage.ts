import {Outage} from '../../../types/YasnoType';

const hours = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
];

const config = {
    cellWidth: 70,
    cellHeight: 50,
    gap: 10,
    strokeWidth: 2,
    padding: 20,
};

const colorMap = {
    '': '#333',
    'DEFINITE_OUTAGE': '#fff',
    'POSSIBLE_OUTAGE': '#333',
};

const backgroundColorMap = {
    '': '#fff',
    'DEFINITE_OUTAGE': '#1a3a64',
    'POSSIBLE_OUTAGE': '#95aed0',
};

export interface ScheduleImageInterface {
    createSingleDayScheduleSVG(daySchedule: Outage[]): string
    createTimelineSVG(schedule: Outage[]): string
}

export class ScheduleImage implements ScheduleImageInterface {
    createSingleDayScheduleSVG(daySchedule: Outage[]): string {
        const gridSize = Math.ceil(Math.sqrt(hours.length));
        const svgWidth = gridSize * (config.cellWidth + config.gap) - config.gap + (config.strokeWidth * 2) + (config.padding * 2);
        const svgHeight = gridSize * (config.cellHeight + config.gap) - config.gap + (config.strokeWidth * 2) + (config.padding * 2);
        const hourSchedule = Array(24).fill('');

        let svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;

        daySchedule.forEach(period => {
            for (let i = period.start; i < period.end; i++) {
                hourSchedule[i] = period.type;
            }
        });

        hours.forEach((hour, index) => {
            const rowIndex = Math.floor(index / gridSize);
            const colIndex = index % gridSize;
            // @ts-ignore
            const color = colorMap[hourSchedule[index]];
            // @ts-ignore
            const backgroundColor = backgroundColorMap[hourSchedule[index]];
            const stroke = hourSchedule[index] !== '' ? 'transparent' : '#ffc43a';

            svgContent += `<rect
                x="${colIndex * (config.cellWidth + config.gap) + config.strokeWidth + config.padding}"
                y="${rowIndex * (config.cellHeight + config.gap) + config.strokeWidth + config.padding}"
                width="${config.cellWidth}"
                height="${config.cellHeight}"
                fill="${backgroundColor}"
                stroke="${stroke}"
                stroke-width="${config.strokeWidth}"
                rx="8"
            />`;

            svgContent += `<text
                x="${colIndex * (config.cellWidth + config.gap) + 17 + config.strokeWidth + config.padding}"
                y="${rowIndex * (config.cellHeight + config.gap) + 29 + config.strokeWidth + config.padding}"
                fill="${color}"
                font-size="14"
                style="font-family: sans-serif;"
            >${hour}</text>`;
        });

        svgContent += `</svg>`;

        return svgContent;
    }

    createTimelineSVG(schedule: Outage[]): string {
        const width = 450;
        const hourHeight = 20;
        const padding = 20;
        const totalHours = 24;
        const height = (totalHours * hourHeight) + (2 * padding) + 15;
        const colors = {
            'DEFINITE_OUTAGE': '#1a3a64',
            'POSSIBLE_OUTAGE': '#95aed0',
        };
        const titles = {
            'DEFINITE_OUTAGE': 'Електроенергії немає',
            'POSSIBLE_OUTAGE': 'Можливе відключення електроенергії',
        };

        let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="font-family: Roboto, sans-serif; background-color: #fff;">`;

        schedule.forEach(event => {
            const startY = event.start * hourHeight + padding;
            const endY = event.end * hourHeight + padding;
            const rectHeight = endY - startY;

            svg += `<rect x="50" y="${startY}" width="${width - 100}" height="${rectHeight}" fill="${colors[event.type]}" rx="5" ry="5"></rect>`;
            svg += `<text x="55" y="${startY + 14}" fill="#fff" font-size="12">${titles[event.type]} ${event.start}:00 – ${event.end}:00</text>`;
        });

        for (let i = 0; i <= totalHours; i++) {
            const y = i * hourHeight + 15 + padding;
            svg += `<text x="40" y="${y}" font-size="10" fill="#34495e" text-anchor="end">${i}:00</text>`;
        }

        svg += `</svg>`;

        return svg;
    }
}
