-- CreateTable
CREATE TABLE "lightning_talks" (
    "exhibit_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "slide_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lightning_talks_pkey" PRIMARY KEY ("exhibit_id")
);

-- AddForeignKey
ALTER TABLE "lightning_talks" ADD CONSTRAINT "lightning_talks_exhibit_id_fkey" FOREIGN KEY ("exhibit_id") REFERENCES "exhibits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
