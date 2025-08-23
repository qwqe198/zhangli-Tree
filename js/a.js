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
if(hasMilestone("a",4))sp=sp.mul(player.p.points.add(10).log10())
if(hasMilestone("a",6))sp=sp.mul(player.a.milestones.length+1)
if(hasMilestone("a",7))sp=sp.mul(layers.p.eff().add(1))
if(hasUpgrade("f",22))sp=sp.mul(10)
if(hasUpgrade("f",24))sp=sp.pow(1.05)
sp=sp.pow(player.a.points.max(1))
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
        effectDescription: "7富有张力的加成 如果你同时买了这两个升级 p升级22第1个效果^10，p升级23第2个效果^80",
        done() { return player.points.gte(1)&&inChallenge("p",11) }
    },
3: {
        requirementDescription: "获得2基础点数获取",
        effectDescription: "8.超快速生产 你每秒获得十亿分之1000000000倍的张力点",
        done() { return layers.p.eff().gte(2) }
    },
4: {
        requirementDescription: "2冲击点",
        effectDescription: "点数获取^0.25后/1000,解锁复制点数，张力点也能增加冲击碎片获取，冲击碎片^（冲击点）",
        done() { return player.a.points.gte(2) }
    },
5: {
        requirementDescription: "1e6冲击碎片",
        effectDescription: "解锁第二个a购买项",
        done() { return player.a.sp.gte(1e6) }
    },
6: {
        requirementDescription: "获得4基础点数获取",
        effectDescription: "冲击碎片x(里程碑+1)",
        done() { return layers.p.eff().gte(4) }
    },
7: {
        requirementDescription: "在震撼人心的挑战中获取1e30点数",
        effectDescription: "冲击碎片x(基础点数获取+1)",
        done() { return player.points.gte(1e30)&&inChallenge("p",11) }
    },
8: {
        requirementDescription: "获得10基础点数获取",
        effectDescription: "降低a第二个购买项价格",
        done() { return layers.p.eff().gte(10) }
    },
9: {
        requirementDescription: "3冲击点",
        effectDescription: "点数获取^0（咕咕咕，负面会改）",
        done() { return player.a.points.gte(3) }
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
  12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(1.5).add(29)).floor()
if(hasMilestone("a",8))c = new Decimal(1.618).pow(x.pow(1.5)).floor()
                return c
 },
            display() { return `复制乘数<br />^${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}冲击碎片<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.mul(0.1).add(1)
                return eff
            },
            unlocked() { return hasMilestone("a",5) },
        },
        },
    tabFormat: {
        "主要": {
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