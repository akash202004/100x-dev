-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);
