export class Packet {
  constructor(
    public packet_num: number, // Must - packet amount, max 2000 , if packet_amt = 1ELA , you can send maximum 500 red packet , 2ELA for 1000 packet etc..
    public packet_amt: number , // Must - ela amount
    public packet_allowed_rcv_addrs: string[], // Optional - only specified addrs can receive the packet
    public packet_type: number, // Must - 0 stand for random red packet, 1 stand for fixed red packet , 2 stand for super node red packet
    public super_node_owner_public_key: string, // Must - if red packet type is 2 then this should fill in the super node owner public key
    public packet_blessin: string, // Optional - red packet note
    public packet_creator: string, // Must - name of the red packet creator
    public packet_end_timestamp: number, // Optional - define the red packet end timestamp
    public language: string, // Optional - current locale language . only support `zh_CN` or `en_US` , default `en_US`
  ) {}
}

export class PacketDetail {
  constructor(
    public language: string,
    public packet_amt: string,
    public packet_blessing: string,
    public packet_creator: string,
    public packet_end_timestamp: number,
    public packet_num: number,
    public packet_rcv_amt: number,
    public packet_rcv_num: number,
    public packet_rcver_details: any[],
    public packet_start_timestamp: number,
    public packet_type: number
  ) {}
}

