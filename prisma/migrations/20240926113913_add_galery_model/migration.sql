-- CreateTable
CREATE TABLE "galery" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "galery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "galery" ADD CONSTRAINT "galery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
