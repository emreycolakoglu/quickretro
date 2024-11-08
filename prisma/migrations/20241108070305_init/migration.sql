-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Retrospective" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminSessionId" INTEGER NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Retrospective_adminSessionId_fkey" FOREIGN KEY ("adminSessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retrospectiveId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "columnId" INTEGER,
    CONSTRAINT "Issue_retrospectiveId_fkey" FOREIGN KEY ("retrospectiveId") REFERENCES "Retrospective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Column" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "retrospectiveId" INTEGER NOT NULL,
    CONSTRAINT "Column_retrospectiveId_fkey" FOREIGN KEY ("retrospectiveId") REFERENCES "Retrospective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
