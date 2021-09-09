import { BigDecimal, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { Protocol } from '../../generated/schema';
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO } from '../constants'

export function getProtocol(event: ethereum.Event): Protocol {
    const day = event.block.timestamp.toI32() / 86400
    const date = day * 86400
    
    const id = date;

    let protocol = Protocol.load(id.toString())

    if(protocol == null) {
        protocol = new Protocol(id.toString())
        protocol.fuel_used = BIG_INT_ZERO;
        protocol.mints = BIG_INT_ZERO;
        protocol.ticket_value = BIG_INT_ZERO;
        protocol.scans = BIG_INT_ZERO;
        protocol.claims = BIG_INT_ZERO;
    }

    return protocol as Protocol
}