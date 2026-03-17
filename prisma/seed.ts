import prisma from "@/lib/prisma";

async function roleAndPermissionsSeed() {
    // 1️⃣ Create Permissions
    const permissionsData = [
        "CREATE_PRODUCT",
        "EDIT_PRODUCT",
        "DELETE_PRODUCT",
        "VIEW_REPORTS",
        "SELL_ITEM",
        "MANAGE_USERS",
    ];

    const permissions = [];
    for (const name of permissionsData) {
        const permission = await prisma.permission.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        permissions.push(permission);
    }

    // 2️⃣ Create Roles
    const rolesData = [
        { name: "Admin", permissionNames: permissionsData }, // all permissions
        { name: "Manager", permissionNames: ["CREATE_PRODUCT", "EDIT_PRODUCT", "VIEW_REPORTS"] },
        { name: "Cashier", permissionNames: ["SELL_ITEM", "VIEW_REPORTS"] },
        { name: "Default", permissionNames: [] }
    ];

    for (const roleData of rolesData) {
        const role = await prisma.role.upsert({
            where: { name: roleData.name },
            update: {},
            create: { name: roleData.name },
        });

        // 3️⃣ Map Role ↔ Permissions
        const rolePermissionsData = permissions
            .filter(p => roleData.permissionNames.includes(p.name))
            .map(p => ({
                roleId: role.id,
                permissionId: p.id,
            }));

        for (const rp of rolePermissionsData) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: rp.roleId,
                        permissionId: rp.permissionId,
                    },
                },
                update: {},
                create: rp,
            });
        }
    }

    console.log("✅ Seeded Roles and Permissions successfully");
}

roleAndPermissionsSeed()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());