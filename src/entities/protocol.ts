import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Protocol } from "../../generated/schema";
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO } from "../constants";

export function getProtocol(): Protocol {
  let id = "1";
  let protocol = Protocol.load(id);

  if (protocol == null) {
    protocol = new Protocol(id);
    protocol.averageReservedPerTicket = BIG_DECIMAL_ZERO;
    protocol.reservedFuel = BIG_DECIMAL_ZERO;
    protocol.reservedFuelProtocol = BIG_DECIMAL_ZERO;
    protocol.currentReservedFuel = BIG_DECIMAL_ZERO;
    protocol.currentReservedFuelProtocol = BIG_DECIMAL_ZERO;
    protocol.spentFuel = BIG_DECIMAL_ZERO;
    protocol.spentFuelProtocol = BIG_DECIMAL_ZERO;
    protocol.currentSpentFuel = BIG_DECIMAL_ZERO;
    protocol.currentSpentFuelProtocol = BIG_DECIMAL_ZERO;
    protocol.collectedSpentFuel = BIG_DECIMAL_ZERO;
    protocol.collectedSpentFuelProtocol = BIG_DECIMAL_ZERO;
    protocol.totalSalesVolume = BIG_DECIMAL_ZERO;
    protocol.topUpCount = BIG_INT_ZERO;
    protocol.eventCount = BIG_INT_ZERO;
    protocol.soldCount = BIG_INT_ZERO;
    protocol.invalidatedCount = BIG_INT_ZERO;
    protocol.resoldCount = BIG_INT_ZERO;
    protocol.scannedCount = BIG_INT_ZERO;
    protocol.checkedInCount = BIG_INT_ZERO;
    protocol.claimedCount = BIG_INT_ZERO;
    protocol.minFeePrimary = BIG_DECIMAL_ZERO;
  }

  return protocol as Protocol;
}

export function updatePrimarySale(count: BigInt, reservedFuel: BigDecimal, reservedFuelProtocol: BigDecimal): void {
  let protocol = getProtocol();
  protocol.soldCount = protocol.soldCount.plus(count);
  protocol.reservedFuel = protocol.reservedFuel.plus(reservedFuel);
  protocol.reservedFuelProtocol = protocol.reservedFuelProtocol.plus(reservedFuelProtocol);
  protocol.currentReservedFuel = protocol.currentReservedFuel.plus(reservedFuel);
  protocol.currentReservedFuelProtocol = protocol.currentReservedFuelProtocol.plus(reservedFuelProtocol);
  protocol.averageReservedPerTicket = protocol.reservedFuel.div(protocol.soldCount.toBigDecimal());
  protocol.save();
}

export function updateSecondarySale(count: BigInt, reservedFuel: BigDecimal, reservedFuelProtocol: BigDecimal): void {
  let protocol = getProtocol();
  protocol.resoldCount = protocol.resoldCount.plus(count);
  protocol.reservedFuel = protocol.reservedFuel.plus(reservedFuel);
  protocol.reservedFuelProtocol = protocol.reservedFuelProtocol.plus(reservedFuelProtocol);
  protocol.currentReservedFuel = protocol.currentReservedFuel.plus(reservedFuel);
  protocol.currentReservedFuelProtocol = protocol.currentReservedFuelProtocol.plus(reservedFuelProtocol);
  protocol.averageReservedPerTicket = protocol.reservedFuel.div(protocol.soldCount.toBigDecimal());
  protocol.save();
}

export function updateScanned(count: BigInt): void {
  let protocol = getProtocol();
  protocol.scannedCount = protocol.scannedCount.plus(count);
  protocol.save();
}

export function updateCheckedIn(count: BigInt, spentFuel: BigDecimal, spentFuelProtocol: BigDecimal): void {
  let protocol = getProtocol();
  protocol.checkedInCount = protocol.checkedInCount.plus(count);
  protocol.currentSpentFuel = protocol.currentSpentFuel.plus(spentFuel);
  protocol.currentSpentFuelProtocol = protocol.currentSpentFuelProtocol.plus(spentFuelProtocol);
  protocol.spentFuel = protocol.spentFuel.plus(spentFuel);
  protocol.spentFuelProtocol = protocol.spentFuelProtocol.plus(spentFuelProtocol);
  protocol.currentReservedFuel = protocol.currentReservedFuel.minus(spentFuel);
  protocol.currentReservedFuelProtocol = protocol.currentReservedFuelProtocol.minus(spentFuelProtocol);
  protocol.save();
}

export function updateInvalidated(count: BigInt, spentFuel: BigDecimal, spentFuelProtocol: BigDecimal): void {
  let protocol = getProtocol();
  protocol.invalidatedCount = protocol.invalidatedCount.plus(count);
  protocol.currentSpentFuel = protocol.currentSpentFuel.plus(spentFuel);
  protocol.currentSpentFuelProtocol = protocol.currentSpentFuelProtocol.plus(spentFuelProtocol);
  protocol.spentFuel = protocol.spentFuel.plus(spentFuel);
  protocol.spentFuelProtocol = protocol.spentFuelProtocol.plus(spentFuelProtocol);
  protocol.currentReservedFuel = protocol.currentReservedFuel.minus(spentFuel);
  protocol.currentReservedFuelProtocol = protocol.currentReservedFuelProtocol.minus(spentFuelProtocol);
  protocol.save();
}

export function updateClaimed(count: BigInt): void {
  let protocol = getProtocol();
  protocol.claimedCount = protocol.claimedCount.plus(count);
  protocol.save();
}

export function updateTotalSalesVolume(price: BigDecimal): void {
  let protocol = getProtocol();
  protocol.totalSalesVolume = protocol.totalSalesVolume.plus(price);
  protocol.save();
}
