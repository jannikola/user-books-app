import { ColumnType, FKDelete, GenerationStrategy } from "../enum/db.enum"
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialMigration1668020516551 implements MigrationInterface {
    private tableName = {
        user: "user",
        role: "role",
        permission: "permission",
        rolePermission: "role_permission",
        book: "book",
    };

    private column = {
        id: "id",
        roleId: "roleId",
        email: "email",
        password: "password",
        firstName: "first_name",
        lastName: "last_name",
        deactivatedAt: "deactivated_at",
        type: "type",
        permissionId: "permissionId",
        authorId: "authorId",
        title: "title",
        publisher: "publisher",
    };

    private foreignKey = {
        userRole: "FK_user_role",
        rolePermissionRole: "FK_rp_role",
        rolePermissionPermission: "FK_rp_permission",
        bookAuthor: "FK_book_author",
    };

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            // USER & ROLE
            const userTable = new Table({
                name: this.tableName.user,
                columns: [
                    {
                        name: this.column.id,
                        type: ColumnType.INT,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: GenerationStrategy.INCREMENT,
                    },
                    {
                        name: this.column.roleId,
                        type: ColumnType.INT,
                        isNullable: false,
                    },
                    {
                        name: this.column.email,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: this.column.password,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                    {
                        name: this.column.firstName,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                    {
                        name: this.column.lastName,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                    {
                        name: this.column.deactivatedAt,
                        type: ColumnType.TIMESTAMP_TIMEZONE,
                        isNullable: true,
                    },
                ],
            });

            await queryRunner.createTable(userTable, true);

            const roleTable = new Table({
                name: this.tableName.role,
                columns: [
                    {
                        name: this.column.id,
                        type: ColumnType.INT,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: GenerationStrategy.INCREMENT,
                    },
                    {
                        name: this.column.type,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                ],
            });

            await queryRunner.createTable(roleTable, true);

            const userRoleFK = new TableForeignKey({
                name: this.foreignKey.userRole,
                columnNames: [this.column.roleId],
                referencedTableName: this.tableName.role,
                referencedColumnNames: [this.column.id],
            });

            await queryRunner.createForeignKey(this.tableName.user, userRoleFK);

            // PERMISSION
            const permissionTable = new Table({
                name: this.tableName.permission,
                columns: [
                    {
                        name: this.column.id,
                        type: ColumnType.INT,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: GenerationStrategy.INCREMENT,
                    },
                    {
                        name: this.column.type,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                ],
            });

            await queryRunner.createTable(permissionTable, true);

            // ROLE_PERMISSION
            const rolePermissionTable = new Table({
                name: this.tableName.rolePermission,
                columns: [
                    {
                        name: this.column.id,
                        type: ColumnType.INT,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: GenerationStrategy.INCREMENT,
                    },
                    {
                        name: this.column.roleId,
                        type: ColumnType.INT,
                        isNullable: false,
                    },
                    {
                        name: this.column.permissionId,
                        type: ColumnType.INT,
                        isNullable: false,
                    },
                ],
            });

            await queryRunner.createTable(rolePermissionTable, true);


            const rolePermissionRoleFK = new TableForeignKey({
                name: this.foreignKey.rolePermissionRole,
                columnNames: [this.column.roleId],
                referencedTableName: this.tableName.role,
                referencedColumnNames: [this.column.id],
                onDelete: FKDelete.CASCADE,
            });

            await queryRunner.createForeignKey(this.tableName.rolePermission, rolePermissionRoleFK);

            const rolePermissionPermissionFK = new TableForeignKey({
                name: this.foreignKey.rolePermissionPermission,
                columnNames: [this.column.permissionId],
                referencedTableName: this.tableName.permission,
                referencedColumnNames: [this.column.id],
                onDelete: FKDelete.CASCADE,
            });

            await queryRunner.createForeignKey(this.tableName.rolePermission, rolePermissionPermissionFK);

            // BOOK
            const bookTable = new Table({
                name: this.tableName.book,
                columns: [
                    {
                        name: this.column.id,
                        type: ColumnType.INT,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: GenerationStrategy.INCREMENT,
                    },
                    {
                        name: this.column.authorId,
                        type: ColumnType.INT,
                        isNullable: false,
                    },
                    {
                        name: this.column.title,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                    {
                        name: this.column.publisher,
                        type: ColumnType.VARCHAR,
                        isNullable: false,
                    },
                ],
            });

            await queryRunner.createTable(bookTable, true);

            const bookAuthorFK = new TableForeignKey({
                name: this.foreignKey.bookAuthor,
                columnNames: [this.column.authorId],
                referencedTableName: this.tableName.user,
                referencedColumnNames: [this.column.id],
                onDelete: FKDelete.CASCADE,
            });

            await queryRunner.createForeignKey(this.tableName.book, bookAuthorFK);
        } catch (e) {
            console.info("Something went wrong on InitialMigration1668020516551 migration: UP");
            console.error(e);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            // BOOK
            await queryRunner.dropForeignKey(this.tableName.book, this.foreignKey.bookAuthor);
            await queryRunner.dropTable(this.tableName.book, true);

            // ROLE_PERMISSION
            await queryRunner.dropForeignKey(this.tableName.rolePermission, this.foreignKey.rolePermissionPermission);
            await queryRunner.dropForeignKey(this.tableName.rolePermission, this.foreignKey.rolePermissionRole);
            await queryRunner.dropTable(this.tableName.rolePermission, true);

            // PERMISSION
            await queryRunner.dropTable(this.tableName.permission, true);

            // USER & ROLE
            await queryRunner.dropForeignKey(this.tableName.user, this.foreignKey.userRole);
            await queryRunner.dropTable(this.tableName.role, true);
            await queryRunner.dropTable(this.tableName.user, true);
        } catch (e) {
            console.info("Something went wrong on InitialMigration1668020516551 migration: DOWN");
            console.error(e);
        }
    }
}
