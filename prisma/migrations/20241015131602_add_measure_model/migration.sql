-- CreateTable
CREATE TABLE "measure" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chest" TEXT NOT NULL,
    "arms" TEXT NOT NULL,
    "waist" TEXT NOT NULL,
    "lowerAbdomen" TEXT NOT NULL,
    "hips" TEXT NOT NULL,
    "legsUnderButtock" TEXT NOT NULL,
    "calves" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measure" ADD CONSTRAINT "measure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
