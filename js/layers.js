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
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "张力点", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 0.1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
if(hasUpgrade("p",22))mult=mult.mul(new Decimal(3.3333).pow(hasMilestone("a",2)?10:1))
if(hasUpgrade("p",23))mult=mult.div(new Decimal(1.1111).pow(hasMilestone("a",2)?80:1))
if(hasUpgrade("p",31))mult=mult.mul(upgradeEffect("p", 31))

if(hasMilestone("a",1))mult=mult.pow(0.5).div(2)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)
if(hasUpgrade("p",22))exp=exp.sub(0.25)
if(hasUpgrade("p",23))exp=exp.add(0.333)

        return exp
    },
    eff() {
        let eff = player.p.points.add(1).log10().mul(0.1).add(1)
eff=eff.pow(buyableEffect("p",12))
if(inChallenge("p",11))eff=eff.div(10)
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
            cost() { return new Decimal(28657) },
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
    },
buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.add(6)).floor()
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
                return eff
            },
            unlocked() { return hasUpgrade("p",21) },
        },
 12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(2).add(16)).floor()
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
                var eff = x.mul(0.1).add(1)
                return eff
            },
            unlocked() { return hasUpgrade("p",24) },
        },
        },
    challenges: {
        11: {
            name: '震撼人心的挑战',
            challengeDescription: '基础点数获取最终/10.',
            rewardDescription() { 
                return `当前最高${format(this.rewardEffect())}`
            },
            rewardEffect() {
                return new Decimal(player.p.challenges[11])
            },
            goal: 0,
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
    layerShown() { return true }
})
addLayer("a", {
    name: "冲击点", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
sp: new Decimal(0),
        }
    },
    color: "#ff0000ff",
    requires: new Decimal(1e25), // Can be a function that takes requirement increases into account
    resource: "冲击点", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal:膨胀资源层 static: 非膨胀资源层 使用时要加双引号
    exponent: 1, // Prestige currency exponent 初始值0.5
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
spg() { // Calculate the multiplier for main currency from bonuses
        sp = player.a.points.mul(player.points.add(10).log10())

        return sp
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
exp = new Decimal(1)


        return exp
    },
   getNextAt() {
        let gain = new Decimal(1e25).pow(new Decimal(2).pow(player.a.points))
      
        return gain
    },
milestones: {
    1: {
        requirementDescription: "1冲击点(6.极具张力的名称)",
        effectDescription: "张力点获取^0.5后/2，解锁冲击碎片，p升级25效果改为解锁一个挑战",
        done() { return player.a.points.gte(1) }
    },
   2: {
        requirementDescription: "在震撼人心的挑战中获取1点数",
        effectDescription: "7富有张力的加成 p升级22第1个效果^10，p升级23第2个效果^80",
        done() { return player.points.gte(1)&&inChallenge("p",11) }
    },
3: {
        requirementDescription: "获得2基础点数获取",
        effectDescription: "8.超快速生产 你每秒获得十亿分之1000000000倍的张力点",
        done() { return layers.p.eff().gte(2) }
    },
4: {
        requirementDescription: "2冲击点",
        effectDescription: "点数获取^0.25,当前残局",
        done() { return player.a.points.gte(2) }
    },
},
buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(1.5)).floor()
                return c
 },
            display() { return `点数获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}冲击碎片<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.a.sp.add(10).log10().pow(x)
                return eff
            },
            unlocked() { return hasMilestone("a",1) },
        },
 
        },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `你有${format(player.a.sp)}(+${format(layers.a.spg())}/s)冲击碎片`,
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
        player.a.sp = player.a.sp.add(this.spg().mul(diff))
        
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "a: 进行冲击重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade("p",25)||player.a.points.gte(1) }
})
