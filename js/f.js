addLayer("f", {
    name: "复制点", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "f", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),

        }
    },
    color: "#3300ffff",
    requires() {
let r=new Decimal(1)
if(inChallenge("a",11))r=new Decimal(Infinity)
 return r
}, // Can be a function that takes requirement increases into account
    resource: "复制点", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.0001, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)


        return exp
    },
 mr() { 
mr = new Decimal(1)
mrpow=new Decimal(1)
if(player.f.points.gte(1e308))mrpow=player.f.points.add(10).log10().div(308).max(1)
if(hasUpgrade("s",24))mrpow=mrpow.div(1.1)
if(hasMilestone("a",9))mr=player.f.points.add(10).log10()
mr=mr.pow(mrpow)
        return mr
    },
 m() { 
m = new Decimal(1.01)
if(hasMilestone("a",13))m=m.add(upgradeEffect("p",35).div(hasMilestone("a",17)?new Decimal(5).sub(player.s.points).max(1):5))
if(hasUpgrade("f",22))m=m.mul(1.005)
if(hasUpgrade("s",14))m=m.mul(upgradeEffect("s",14))
if(hasUpgrade("p",55))m=m.pow(upgradeEffect("p",55))
if(hasUpgrade("p",32))m=m.pow(upgradeEffect("p",32))

if(hasUpgrade("f",24))m=m.pow(1.2)
if(hasUpgrade("f",33))m=m.pow(upgradeEffect("f",23))
if(hasUpgrade("f",34))m=m.pow(buyableEffect("p",12))
m=m.pow(buyableEffect("a",12))
m=m.pow(buyableEffect("f",11))
if(hasUpgrade("s",21))m=m.pow(1.15)
if(hasMilestone("a",23))m=m.pow(player.a.points)
if(hasMilestone("a",29))m=m.pow(player.s.upgrades.length+1)
if(hasMilestone("a",25))m=m.pow(challengeEffect("a", 11).add(1))
m=m.root(layers.f.mr())

        return m
    },
buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
if(x.gte(10)&&!hasMilestone("a",19))x=x.pow(3).div(100)
var pow=new Decimal(2)
if(hasUpgrade("f",43))pow=pow.root(upgradeEffect("f",43))
                var c = new Decimal(1.618).pow(x.pow(pow)).floor()
if(hasUpgrade("f",44))c=c.root(upgradeEffect("f",43))
                return c
 },
            display() { return `复制乘数<br />^${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}复制点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.f.points.gte(this.cost()) },
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.f.points.add(10).log10().add(10).log10().add(10).log10().pow(x.mul(hasMilestone("a",18)?1:3.8))
if(hasUpgrade("f",45))eff=eff.pow(1.05)
                return eff
            },
            unlocked() { return hasMilestone("a",9) },
        },
 
        },
milestones: {
    1: {
        requirementDescription: "1复制点(当前)",
        effectDescription: "禁用复制点重置",
        done() { return player.f.points.gte(1) }
    },
 
},
upgrades: {
   
11: {
            description: "点数获取基于复制点增加",
            cost() { return new Decimal(2) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10()
                if(hasUpgrade("f",21)) b=b.pow(buyableEffect("a",12))
if(hasUpgrade("f",21)) b=b.pow(buyableEffect("p",12))
if(hasUpgrade("f",25)) b=b.pow(upgradeEffect("f",23))
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
12: {
            description: "张力点获取基于复制点增加",
            cost() { return new Decimal(5) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10()
                 b=b.pow(buyableEffect("a",13))
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
13: {
            description: "降低p第2个购买项价格",
            cost() { return new Decimal(1e7) },
            unlocked() { return true },

        },
14: {
            description: "10.张力源自于叠加指数 点数获取变成原来的（冲击点）次方",
            cost() { return new Decimal(1e9) },
            unlocked() { return true },
effect(){
                    let b=player.a.points;
                 
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
15: {
            description: "降低p第1个购买项价格",
            cost() { return new Decimal(1e13) },
            unlocked() { return true },

        },
21: {
            description: "12.两个加成一个 双倍张力 p和a购买项12加成升级11效果",
            cost() { return new Decimal(1e17) },
            unlocked() { return true },

        },
22: {
            description: "14 全部都有乘数，更多张力 点数，张力点，冲击碎片x10，复制乘数x1.005",
            cost() { return new Decimal(1e24) },
            unlocked() { return true },

        },
23: {
            description: "15.膨胀 当然是张力的一种体现 复制点增加p购买项11效果",
            cost() { return new Decimal(1e32) },
            unlocked() { return true },
effect(){
                    let b=player.f.points.add(10).log10().add(10).log10()
                 
                    return b;
                },
                effectDisplay() { return "^"+format(this.effect())},
        },
24: {
            description: "16 全部都有指数，极多张力 点数，张力点，冲击碎片^1.05，复制乘数^1.2",
            cost() { return new Decimal(1e60) },
            unlocked() { return true },

        },
25: {
            description: "17三重张力 升级23加成升级11效果",
            cost() { return new Decimal(1e100) },
            unlocked() { return true },

        },
31: {
            description: "22 指数的指数 一定有张力 a购买13效果^2",
            cost() { return new Decimal(1e308) },
            unlocked() { return player.s.points.gte(2) },

        },
32: {
            description: "p升级33加成p升级32效果",
            cost() { return new Decimal("1e450") },
            unlocked() { return player.s.points.gte(2) },

        },
33: {
            description: "升级23对复制点生效",
            cost() { return new Decimal("1e520") },
            unlocked() { return player.s.points.gte(2) },

        },
34: {
            description: "p购买12对复制点生效",
            cost() { return new Decimal("1e575") },
            unlocked() { return player.s.points.gte(2) },

        },
35: {
            description: "p购买12基数基于复制点增加",
            cost() { return new Decimal("1e725") },
            unlocked() { return player.s.points.gte(3) },
            
effect(){
                    let b=player.f.points.add(10).log10().pow(0.005).sub(1)
                 
                    return b;
                },
                effectDisplay() { return "+"+format(this.effect())},
        },
41: {
            description: "s升级14效果指数加成点数",
            cost() { return new Decimal("7.77e777") },
            unlocked() { return player.s.points.gte(3) },

        },
42: {
            description: "s升级12效果加成点数",
            cost() { return new Decimal("1e800") },
            unlocked() { return player.s.points.gte(3) },

        },
43: {
            description: "复制超新星降低f购买11价格增长指数",
            cost() { return new Decimal("1e825") },
            unlocked() { return player.s.points.gte(3) },
effect(){
                    let b=player.s.points.add(10).log10()
                 
                    return b;
                },
                effectDisplay() { return "开"+format(this.effect())+"次根"},

        },
44: {
            description: "上一个升级再次对价格本身生效",
            cost() { return new Decimal("1e925") },
            unlocked() { return player.s.points.gte(3) },

        },
45: {
            description: "f购买11效果^1.05",
            cost() { return new Decimal("1e1050") },
            unlocked() { return player.s.points.gte(3) },

        },
    },
    tabFormat: {
        "main": {
            content: [
                "main-display",
["prestige-button", "", function () { return player.f.points.gte(1)? { 'display': 'none' } : {} }],

                ["display-text", () => 
                    `9.滚雪球同样是具备张力的 复制点每秒x${format(layers.f.m())},建议在复制点略高于价格时购买`,
                    { "font-size": "20px" }
                ],
"milestones",
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ],
            unlocked() { return true }
        },
     
        },
    
    update(diff) {
var pow11=new Decimal(2)
if(hasUpgrade("f",43))pow11=pow11.root(upgradeEffect("f",43))
player.f.points = player.f.points.mul(this.m().pow(diff))
      if(hasUpgrade("s",25)||hasMilestone("a", 30))player.f.points = player.f.points.max(hasMilestone("a", 30)?1e10:1)
if(hasMilestone("a", 25))setBuyableAmount(this.layer, 11, player.f.points.pow(hasUpgrade("f",44)?upgradeEffect("f",43):1).add(1).log10().div(0.2089785172762535).root(pow11).floor().add(1))
    
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    autoUpgrade() { return hasMilestone("a", 30)  },
    layerShown() { return hasMilestone("a", 4) }
})