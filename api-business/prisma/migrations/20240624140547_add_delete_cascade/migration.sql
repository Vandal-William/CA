-- DropForeignKey
ALTER TABLE "Benefit" DROP CONSTRAINT "Benefit_subscriptionId_fkey";

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
