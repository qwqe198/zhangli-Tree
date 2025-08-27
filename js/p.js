addLayer("p", {
    name: "张力点", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "p", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#00FF00",
 requires() {
let r=new Decimal(10)
if(inChallenge("a",12))r=new Decimal(Infinity)
 return r
}, 
    resource: "张力点", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
if(hasUpgrade("p",22))mult=mult.mul(new Decimal(3.3333).pow(hasMilestone("a",2)&&hasUpgrade("p",23)?10:1))
if(hasUpgrade("p",23))mult=mult.div(new Decimal(1.1111).pow(hasMilestone("a",2)&&hasUpgrade("p",22)?80:1))
if(hasUpgrade("p",31))mult=mult.mul(upgradeEffect("p", 31))
if(hasUpgrade("f",12))mult=mult.mul(upgradeEffect("f",12))
if(hasUpgrade("p",34))mult=mult.pow(buyableEffect("a",12))
if(hasUpgrade("f",22))mult=mult.mul(10)
if(hasUpgrade("s",12))mult=mult.mul(upgradeEffect("s",12))
if(hasUpgrade("f",24))mult=mult.pow(1.05)
if(hasUpgrade("s",22))mult=mult.pow(1.15)
if(hasMilestone("a",30))mult=mult.pow(1+player.a.milestones.length*0.01)

if(hasMilestone("a",1))mult=mult.pow(0.5).div(2)
if(hasMilestone("a",18))mult=mult.root(player.a.points)
if(mult.gte(1e50)&&hasMilestone("a",18))mult=mult.pow(0.1).mul(1e45)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)//基础是0.1，要x10
if(hasUpgrade("p",22))exp=exp.sub(0.25)
if(hasUpgrade("p",23))exp=exp.add(0.333)
if(hasUpgrade("p",35))exp=exp.add(upgradeEffect("p",35).mul(10))
if(hasMilestone("a",21))exp=exp.add(challengeEffect("a", 11).div(10))
if(exp.gte(3))exp=exp.mul(0.1).add(2.7)
        return exp
    },
    eff() {
        let eff = player.p.points.add(1).log10().mul(0.1).add(1)
if(hasMilestone("a",28))eff=eff.mul(player.a.milestones.length/25)
eff=eff.pow(buyableEffect("p",12))
if(hasUpgrade("p",33))eff=eff.pow(upgradeEffect("p",33))
if(inChallenge("p",11)&&!hasMilestone("a", 18))eff=eff.div(10)
if(hasMilestone("a",9))eff=eff.pow(0.5).div(hasUpgrade("f",14)?1:2)
if(inChallenge("p",11)&&hasMilestone("a", 18))eff=new Decimal(1)
        return eff
    },
    effectDescription() { return `基础点数获取${format(layers.p.eff())}` },
    upgrades: {
        11: {
            description: "1.极致的指数 点数获取变成原来的平方",
            cost() { return new Decimal(1) },
            unlocked() { return true },
        },
        12: {
            description: "点数获取变成原来的平方",
            cost() { return new Decimal(2) },
            unlocked() { return true },
        },
        13: {
            description: "点数获取变成原来的平方",
            cost() { return new Decimal(3) },
            unlocked() { return true },
        },
        14: {
            description: "点数获取变成原来的平方",
            cost() { return new Decimal(5) },
            unlocked() { return true },
        },
        15: {
            description: "点数获取变成原来的平方",
            cost() { return new Decimal(8) },
            unlocked() { return true },
        },
21: {
            description: "解锁一个可购买",
            cost() { return new Decimal(13) },
            unlocked() { return true },
        },
22: {
            description: "3.超大乘数 张力点获取x3.3333，但是指数-0.025",
            cost() { return new Decimal(144) },
            unlocked() { return true },
        },
23: {
            description: "4.超大指数 张力点获取指数+0.0333，但是获取/1.1111",
            cost() { return new Decimal(377) },
            unlocked() { return true },
        },
24: {
            description: "解锁第二个可购买",
            cost() { return new Decimal(2584) },
            unlocked() { return true },
        },
25: {
            description: "解锁一个新层级",
            cost() { return new Decimal(10946) },
            unlocked() { return true },
        },
31: {
            description: "张力点获取基于冲击碎片增加",
            cost() { return new Decimal(50) },
            unlocked() { return hasMilestone("a",1) },
effect(){
                    let b=player.a.sp.add(10).log10();
                 
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
32: {
            description: "复制乘数基于张力点增加",
            cost() { return new Decimal(150) },
            unlocked() { return hasMilestone("a",4) },
effect(){
                    let b=player.p.points.add(1).log10().mul(0.1).add(1);
                 if(hasUpgrade("f",32))b=b.pow(upgradeEffect("p",33))
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
33: {
            description: "复制点也能加成基础点数获取",
            cost() { return new Decimal(10000) },
            unlocked() { return hasMilestone("a",4) },
effect(){
                    let b=player.f.points.add(1).log10().add(1).log10().mul(0.1).add(1);
                 
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
34: {
            description: "11.一个购买，多种作用 更具张力之美 a购买项12也能增加张力点获取",
            cost() { return new Decimal(100000) },
            unlocked() { return hasMilestone("a",4) },

        },
35: {
            description: "13.极高的加成 张力点获取指数+1e-8*升级数量^5",
            cost() { return new Decimal(1000000) },
            unlocked() { return hasMilestone("a",4) },
effect(){
                    let b=new Decimal(player.p.upgrades.length).pow(5).mul(1e-8)
                 
                    return b;
                },
                effectDisplay() { return "+"+format(this.effect())},
        },
41: {
            description: "张力！",
            cost() { return new Decimal(1e7) },
            unlocked() { return hasMilestone("a",4) },

        },
42: {
            description: "张力！！",
            cost() { return new Decimal(2.5e7) },
            unlocked() { return hasMilestone("a",4) },

        },
43: {
            description: "张力！！！",
            cost() { return new Decimal(2e8) },
            unlocked() { return hasMilestone("a",4) },

        },
44: {
            description: "张力！！！！",
            cost() { return new Decimal(1e12) },
            unlocked() { return hasMilestone("a",4) },

        },
45: {
            description: "张力！！！！！",
            cost() { return new Decimal(1e24) },
            unlocked() { return hasMilestone("a",4) },

        },
51: {
            description: "升级35加成购买12基数",
            cost() { return new Decimal(1e140) },
            unlocked() { return hasMilestone("a",9) },

        },
52: {
            description: "24节俭张力 p购买12变得更便宜",
            cost() { return new Decimal(7.77e177) },
            unlocked() { return hasMilestone("a",9) },

        },
53: {
            description: "购买12加成a购买11",
            cost() { return new Decimal(100000) },
            unlocked() { return hasMilestone("a",18) },

        },
54: {
            description: "中子星获取x(冲击点),你的复制超新星不会低于1",
            cost() { return new Decimal(1e16) },
            unlocked() { return hasMilestone("a",18) },

        },
55: {
            description: "购买升级数量的千分之一加成复制乘数",
effect(){
                    let b=new Decimal(player.p.upgrades.length).mul(1e-3).add(1)
                 
                    return b;
                },
                effectDisplay() { return "x"+format(this.effect())},
            cost() { return new Decimal(1e40) },
            unlocked() { return hasMilestone("a",18) },

        },
    },
buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.add(6)).floor()
if(hasUpgrade("f",15))c = new Decimal(1.618).pow(x).floor()
                return c
 },
            display() { return `点数获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}张力点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "2.巨大张力的效果"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = new Decimal(10).pow(x)
if(hasUpgrade("f",23))eff=eff.pow(upgradeEffect("f", 23))
if(hasMilestone("a",18))eff=eff.root(player.a.points)
                return eff
            },
            unlocked() { return hasUpgrade("p",21) },
        },
 12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(2).add(16)).floor()
if(hasUpgrade("f",13))c = new Decimal(1.618).pow(x.pow(hasUpgrade("p",52)?1.9:2)).floor()
                return c
 },
            display() { return `张力点效果<br />^${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}张力点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "5.张力的另一个形式 指数加成"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
var base = new Decimal(0.1)
                
if(hasMilestone("a", 16))base=base.add(player.s.points.mul(0.01))
if(hasUpgrade("p",51))base=base.add(upgradeEffect("p", 35))
if(hasUpgrade("f",35))base=base.add(upgradeEffect("f", 35))
if(hasMilestone("a",22))base=base.add(challengeEffect("a", 11).div(100))
var eff = x.mul(base).add(1)
                return eff
            },
            unlocked() { return hasUpgrade("p",24) },
        },
        },
    challenges: {
        11: {
            name() { return hasMilestone("a", 18)? "震撼人心的挑战2":'震撼人心的挑战'},
            challengeDescription() { return hasMilestone("a", 18)? "基础点数获取固定为1":'基础点数获取最终/10.'},
            rewardDescription() { 
                return `当前最高${format(this.rewardEffect())}`
            },
            rewardEffect() {
                return new Decimal(player.p.challenges[11])
            },
            goal: 0,
 onEnter() {
                if(hasMilestone("a", 18))player.p.points=new Decimal(0)
if(hasMilestone("a", 18))player.p.buyables[11] = new Decimal(0)
if(hasMilestone("a", 18))player.p.buyables[12] = new Decimal(0)
            if(hasMilestone("a", 18))player.p.upgrades = []
            },
            onExit() {
                player.p.challenges[11] = player.points.max(challengeEffect("p", 11)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.points },
            unlocked() { return hasUpgrade("p",25) && hasMilestone("a", 1) }
        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "p", description: "p: 进行声望重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
 passiveGeneration() {
        if (hasMilestone("a", 3)) return 1
        return 0
    },
    layerShown() { return true },
  update(diff) {
       if(hasMilestone("a", 12))setBuyableAmount(this.layer, 11, player.p.points.add(1).log10().div(0.2089785172762535).floor().add(1))
        if(hasUpgrade("s", 23))setBuyableAmount(this.layer, 12, player.p.points.add(1).log10().div(0.2089785172762535).root(hasUpgrade("p",52)?1.9:2).floor().add(1))
    },
 autoUpgrade() { return hasMilestone("a", 9)  },
})