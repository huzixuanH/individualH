import { pgTable, varchar, timestamp, text, integer, uniqueIndex, index, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const verificationToken = pgTable("VerificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => {
	return {
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").using("btree", table.identifier.asc().nullsLast(), table.token.asc().nullsLast()),
		tokenKey: uniqueIndex("VerificationToken_token_key").using("btree", table.token.asc().nullsLast()),
	}
});

export const user = pgTable("User", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ precision: 3, mode: 'string' }),
	image: text(),
}, (table) => {
	return {
		emailKey: uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast()),
	}
});

export const account = pgTable("Account", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").using("btree", table.provider.asc().nullsLast(), table.providerAccountId.asc().nullsLast()),
		userIdIdx: index("Account_userId_idx").using("btree", table.userId.asc().nullsLast()),
		accountUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Account_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const session = pgTable("Session", {
	id: text().primaryKey().notNull(),
	sessionToken: text().notNull(),
	userId: text().notNull(),
	expires: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").using("btree", table.sessionToken.asc().nullsLast()),
		userIdIdx: index("Session_userId_idx").using("btree", table.userId.asc().nullsLast()),
		sessionUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Session_userId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});
