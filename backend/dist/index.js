import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function test() {
    try {
        const res = await prisma.user.create({
            data: {
                name: "test2",
                email: "test3"
            }
        });
        console.log("test successfull : ", res);
    }
    catch (error) {
        console.log(error);
    }
}
test();
//# sourceMappingURL=index.js.map