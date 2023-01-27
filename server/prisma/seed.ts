import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = '38839aa0-9e53-11ed-a8fc-0242ac120002'
const firstHabitCreationDate = new Date('2022-12-31')

const secondHabitId = '38839de8-9e53-11ed-a8fc-0242ac120002'
const secondHabitCreationDate = new Date('2023-01-03')

const thirdHabitId = '3883a3c4-9e53-11ed-a8fc-0242ac120002'
const thirdHabitCreationDate = new Date('2023-01-08')

async function main() {
    await prisma.dayHabit.deleteMany()
    await prisma.habitWeekDay.deleteMany()
    await prisma.day.deleteMany()
    await prisma.habit.deleteMany()

    /**
     * Create habits
     */
    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Beber 2L água',
                created_at: firstHabitCreationDate,
                weekDays: {
                    create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
                },
            },
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Exercitar',
                created_at: secondHabitCreationDate,
                weekDays: {
                    create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }],
                },
            },
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Dormir 8h',
                created_at: thirdHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ],
                },
            },
        }),
    ])

    await Promise.all([
        /**
         * Habits (Complete/Available): 1/1
         */
        prisma.day.create({
            data: {
                /** Monday */
                date: new Date('2023-01-02T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),

        /**
         * Habits (Complete/Available): 1/1
         */
        prisma.day.create({
            data: {
                /** Friday */
                date: new Date('2023-01-06T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),

        /**
         * Habits (Complete/Available): 2/2
         */
        prisma.day.create({
            data: {
                /** Wednesday */
                date: new Date('2023-01-04T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ],
                },
            },
        }),
    ])
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
