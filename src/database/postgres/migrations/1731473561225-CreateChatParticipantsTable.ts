import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateChatParticipantsTable1731473561225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chat_participants",
                columns: [
                    {
                        name: "chatId",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "chat_participants",
            new TableForeignKey({
                columnNames: ["chatId"],
                referencedColumnNames: ["id"],
                referencedTableName: "chat",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "chat_participants",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("chat_participants");
    }

}
