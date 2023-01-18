import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = 'sdaf6as7dcft7a6sdtf7a6sdtf7asdt6f7asd6ctfasd'
const firstHabitCreationDate = new Date('2022-12-31')

const secondHabitId = 'df6tasd7ftdas76fta7sdf6asdfas8d6f6'
const secondHabitCreationDate = new Date('2023-01-03')

const thirdHabitId = 'f6a5sd4f6d5as4f3sad1f65asdf7f1a6sd5f1asd6f54sd'
const thirdHabitCreationDate = new Date('2023-01-08')

async function main() {
    await prisma.dayHabit.deleteMany()
    await prisma.habitWeekDay.deleteMany()
    await prisma.day.deleteMany()
    await prisma.habit.deleteMany()
    // Create Habits
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
        // Habits (Complete/Available): 1/1
        prisma.day.create({
            data: {
                date: new Date('2023-01-06'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),
        prisma.day.create({
            data: {
                date: new Date('2023-01-03'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),
        prisma.day.create({
            data: {
                date: new Date('2023-01-04'),
                dayHabits: {
                    create: [
                        {
                            habit_id: firstHabitId,
                        },
                        {
                            habit_id: secondHabitId,
                        },
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
