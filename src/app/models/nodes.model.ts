export class Node {
  constructor(
    public Producer_public_key: string,
    public Value: string,
    public Address: string,
    public Rank: number,
    public Ownerpublickey: string,
    public Nodepublickey: string,
    public Nickname: string,
    public Url: string,
    public Location: any,
    public Active: boolean,
    public Votes: string,
    public Netaddress: string,
    public State: string,
    public Registerheight: number,
    public Cancelheight: number,
    public Inactiveheight: number,
    public Illegalheight: number,
    public Index: number,
    public Reward: string,
    public EstRewardPerYear: string,
    public imageUrl: string,
    public isChecked: boolean
  ) {}
}
