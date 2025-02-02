import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword1 = await bcrypt.hash('supersecret', 10);
    const hashedPassword2 = await bcrypt.hash('supersecret', 10);

    // Validasi sebelum seeding
    const userExists1 = await prisma.user.findUnique({ where: { email: 'yusup@gmail.com' } });
    if (!userExists1) {
        const user1 = await prisma.user.create({
            data: {
                email: 'yusup@gmail.com',
                username: 'Yusup',
                password: hashedPassword1,
            },
        });
        console.log('User1 created:', user1);
    }

    const userExists2 = await prisma.user.findUnique({ where: { email: 'yondex@gmail.com' } });
    if (!userExists2) {
        const user2 = await prisma.user.create({
            data: {
                email: 'yondex@gmail.com',
                username: 'Yondex',
                password: hashedPassword2,
            },
        });
        console.log('User2 created:', user2);
    }
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
