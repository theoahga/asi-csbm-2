class Card{
    private readonly _name: string;
    private readonly _description: string;
    private readonly _affinity: string;
    private readonly _imgUrl: string;
    private readonly _smallImgUrl: string;
    private readonly _id: number;
    private readonly _energy: number;
    private _hp: number;
    private readonly _defence: number;
    private readonly _attack: number;
    private readonly _price: number;
    private readonly _userId: number;

    constructor(name: string, description: string, affinity: string, imgUrl: string, smallImgUrl: string, id: number, energy: number, hp: number, defence: number, attack: number, price: number, userId: number) {
        this._name = name;
        this._description = description;
        this._affinity = affinity;
        this._imgUrl = imgUrl;
        this._smallImgUrl = smallImgUrl;
        this._id = id;
        this._energy = energy;
        this._hp = hp;
        this._defence = defence;
        this._attack = attack;
        this._price = price;
        this._userId = userId;
    }


    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get affinity(): string {
        return this._affinity;
    }

    get imgUrl(): string {
        return this._imgUrl;
    }

    get smallImgUrl(): string {
        return this._smallImgUrl;
    }

    get id() {
        return this._id;
    }

    get energy(): number {
        return this._energy;
    }

    get hp(): number {
        return this._hp;
    }

    get defence(): number {
        return this._defence;
    }

    get attack(): number {
        return this._attack;
    }

    get price(): number {
        return this._price;
    }

    get userId(): number {
        return this._userId;
    }


    set hp(value: number) {
        this._hp = value;
    }
}

export default Card;