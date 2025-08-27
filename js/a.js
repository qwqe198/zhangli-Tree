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
if(hasMilestone("a",9))sp=sp.mul(player.f.points.add(10).log10())
if(hasMilestone("a",6))sp=sp.mul(player.a.milestones.length+1)
if(hasMilestone("a",7))sp=sp.mul(layers.p.eff().add(1))
if(hasUpgrade("f",22))sp=sp.mul(10)
if(hasUpgrade("s",13))sp=sp.mul(upgradeEffect("s",13))
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
        requirementDescription: "1 1冲击点(6.极具张力的名称)",
        effectDescription: "张力点获取^0.5后/2，解锁冲击碎片，p升级25效果改为解锁一个挑战",
        done() { return player.a.points.gte(1) }
    },
   2: {
        requirementDescription: "2 在震撼人心的挑战中获取1点数",
        effectDescription: "7富有张力的加成 如果你同时买了这两个升级 p升级22第1个效果^10，p升级23第2个效果^80",
        done() { return player.points.gte(1)&&inChallenge("p",11) }
    },
3: {
        requirementDescription: "3 获得2基础点数获取",
        effectDescription: "8.超快速生产 你每秒获得十亿分之1000000000倍的张力点",
        done() { return layers.p.eff().gte(2) }
    },
4: {
        requirementDescription: "4 2冲击点",
        effectDescription: "点数获取^0.25后/1000,解锁复制点，张力点也能增加冲击碎片获取，冲击碎片^（冲击点）",
        done() { return player.a.points.gte(2) }
    },
5: {
        requirementDescription: "5 1e6冲击碎片",
        effectDescription: "解锁第二个a购买项",
        done() { return player.a.sp.gte(1e6) }
    },
6: {
        requirementDescription: "6 获得4基础点数获取",
        effectDescription: "冲击碎片x(里程碑+1)",
        done() { return layers.p.eff().gte(4) }
    },
7: {
        requirementDescription: "7 在震撼人心的挑战中获取1e30点数",
        effectDescription: "冲击碎片x(基础点数获取+1)",
        done() { return player.points.gte(1e30)&&inChallenge("p",11) }
    },
8: {
        requirementDescription: "8 获得10基础点数获取",
        effectDescription: "降低a第二个购买项价格",
        done() { return layers.p.eff().gte(10) }
    },
9: {
        requirementDescription: "9 3冲击点",
        effectDescription: "张力点效果^0.5后/2，（18 反向滚雪球，循环张力）复制乘数开（复制点的数量级）次根,但是复制点提升冲击碎片获取.自动购买p升级，如果购买f升级14，移除/2效果",
        done() { return player.a.points.gte(3) }
    },
10: {
        requirementDescription: "10 19真的是循环,好有张力啊 第2个里程碑，但是在3冲击点",
        effectDescription: "解锁第三个a购买项",
        done() { return player.points.gte(1)&&inChallenge("p",11)&&player.a.points.gte(3) }
    },
11: {
        requirementDescription: "11 第8个里程碑，但是在3冲击点",
        effectDescription: "20 超新星，宇宙级的张力 解锁复制超新星",
        done() { return layers.p.eff().gte(10)&&player.a.points.gte(3) }
    },
12: {
        requirementDescription: "12 获得1复制超新星",
        effectDescription: "自动购买p购买项11",
        done() { return player.s.points.gte(1) }
    },
13: {
        requirementDescription: "13 1e40冲击碎片",
        effectDescription: "p层级升级35的五分之一加成复制乘数",
        done() { return player.a.sp.gte(1e40) }
    },
14: {
        requirementDescription: "14 获得1e308复制点(软上限)",
        effectDescription: "21 有张力的软上限 里程碑9效果2变成原来的(复制点数量级/308)次方(不低于1)",
        done() { return player.f.points.gte(1e308) }
    },
15: {
        requirementDescription: "15 获得2复制超新星",
        effectDescription: "复制超新星的(冲击点)次方加成s前3个升级效果",
        done() { return player.s.points.gte(2) }
    },
16: {
        requirementDescription: "16 获得1e128张力点",
        effectDescription: "每个复制超新星使p购买12基数+0.01",
        done() { return player.p.points.gte(1e128) }
},
17: {
        requirementDescription: "17 获得3复制超新星",
        effectDescription: "里程碑13效果改成(5-复制超新星)分之一(不低于1)",
        done() { return player.s.points.gte(3) }
    },
18: {
        requirementDescription: "18 4冲击点",
        effectDescription: "p购买11效果和张力点获取开(冲击点)次根,削弱f购买11效果,25 张力升级 修改p挑战11，且进入时重置p除挑战的所有东西",
        done() { return player.a.points.gte(4) }
    },
19: {
        requirementDescription: "19 在震撼人心的挑战2中获取1e64点数",
        effectDescription: "移除f购买11的折算",
        done() { return player.points.gte(1e64)&&inChallenge("p",11)&&hasMilestone("a",18)}
    },
20: {
        requirementDescription: "20 在震撼人心的挑战2中获取1e72点数",
        effectDescription: "降低a购买13价格,26 黄金张力 解锁镀金",
        done() { return player.points.gte(1e72)&&inChallenge("p",11)&&hasMilestone("a",18)}
    },
21: {
        requirementDescription: "21 获得2p镀金分数",
        effectDescription: "p镀金分数的百分之一加成张力点获取指数",
        done() { return challengeEffect("a", 11).gte(2)}
    },
22: {
        requirementDescription: "22 获得4p镀金分数",
        effectDescription: "p镀金分数的百分之一加成p购买12基数",
        done() { return challengeEffect("a", 11).gte(4)}
    },
23: {
        requirementDescription: "23 27.双里程碑张力 在上一个里程碑的基础上获得1e25复制点",
        effectDescription: "复制点乘数^(冲击点)",
        done() { return hasMilestone("a",22)&&player.f.points.gte(1e25)}
    },
24: {
        requirementDescription: "24 第15里程碑 但是在4冲击点",
        effectDescription: "解锁f镀金",
        done() { return hasMilestone("a",18)&&player.s.points.gte(2)}
    },
25: {
        requirementDescription: "25 获得1f镀金分数",
        effectDescription: "自动购买复制点第一个购买,复制乘数变成原来的(f镀金分数+1)次方",
        done() { return challengeEffect("a", 12).gte(1)}
    },
26: {
        requirementDescription: "26 第17里程碑 但是在4冲击点",
        effectDescription: "中子星获取x(复制点的二重数量级),在3超新星时解锁新的中子树升级",
        done() { return hasMilestone("a",18)&&player.s.points.gte(3)}
    },
27: {
        requirementDescription: "27 获得1e1000复制点",
        effectDescription: "a购买12效果^1.1",
        done() { return player.f.points.gte("1e1000") }
},
28: {
        requirementDescription: "28 获得5.7p镀金分数",
        effectDescription: "基础点数获取乘里程碑的25分之一",
        done() { return challengeEffect("a", 11).gte(5.7)}
    },
29: {
        requirementDescription: "29 获得1.4f镀金分数",
        effectDescription: "复制乘数变成原来的(s升级+1)次方",
        done() { return challengeEffect("a", 12).gte(1.4)}
    },
30: {
        requirementDescription: "30 获得4复制超新星",
        effectDescription: "自动购买f升级,你的复制点不会低于1e10(需要购买对应升级),张力点获取^(1+里程碑*0.01)",
        done() { return player.s.points.gte("4") }
},
31: {
        requirementDescription: "31 获得6.6p镀金分数",
        effectDescription: "中子星获取x(p镀金分数)",
        done() { return challengeEffect("a", 11).gte(6.6)}
    },
32: {
        requirementDescription: "32 完成4次极端折算",
        effectDescription: "f升级43效果^(里程碑/30)",
        done() { return player.s.challenges[11]>=4}
    },
33: {
        requirementDescription: "33 获得1e1725复制点",
        effectDescription: "复制点乘数^(f升级数量+1)",
        done() { return player.f.points.gte("1e1725") }
},
34: {
        requirementDescription: "34 完成5次极端折算",
        effectDescription: "p升级33效果^(里程碑/30)",
        done() { return player.s.challenges[11]>=5}
    },
35: {
        requirementDescription: "35 获得7.3p镀金分数",
        effectDescription: "30.来自里程碑的张力 张力!",
        done() { return challengeEffect("a", 11).gte(7.3)}
    },
36: {
        requirementDescription: "36 获得2.15f镀金分数",
        effectDescription: "31.多功能张力 张力!!中子星获取x(f镀金分数) ",
        done() { return challengeEffect("a", 12).gte(2.15)}
    },
37: {
        requirementDescription: "37 咕咕咕",
        effectDescription: "咕咕咕 ",
        done() { return false}
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
if(hasUpgrade("p",53))eff=eff.pow(buyableEffect("p", 12))
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
if(hasMilestone("a",27))eff=eff.pow(1.1)
                return eff
            },
            unlocked() { return hasMilestone("a",5) },
        },
 13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(3).add(100)).floor()
if(hasMilestone("a",20))c = new Decimal(1.618).pow(x.pow(3)).floor()
                return c
 },
            display() { return `f升级12效果<br />^${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}冲击碎片<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.add(1).pow(0.5)
if(hasUpgrade("f",31))eff=eff.pow(2)
                return eff
            },
            unlocked() { return hasMilestone("a",10) },
        },
        },
    tabFormat: {
        "mil": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `你有${format(player.a.sp)}(+${format(layers.a.spg())}/s)冲击碎片`,
                    { "font-size": "20px" }
                ],
"milestones",
                
            ],
            unlocked() { return true }
        },
     "buy": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `你有${format(player.a.sp)}(+${format(layers.a.spg())}/s)冲击碎片`,
                    { "font-size": "20px" }
                ],

                "buyables",
            ],
            unlocked() { return true }
        },
 "chl": {
            content: [
                "main-display",
 "prestige-button",
                "resource-display",
             

                "challenges",
            ],
            unlocked() { return hasMilestone("a", 20) }
        },
        },
    challenges: {
        11: {
            name() { return 'p镀金'},
            challengeDescription() { return '禁用f层级,基于镀金内最高张力点获得分数.'},
            rewardDescription() { 
                return `镀金分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let re=new Decimal(0)
              if(inChallenge("a",11))  re=re.max(player.p.points.add(1).log10().pow(0.5)).max(challengeEffect("a", 11))

 if(!inChallenge("a",11))re=re.max(player.a.challenges[11])
return re
            },
            goal: 0,

            onExit() {
                player.a.challenges[11] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("a", 11)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return  hasMilestone("a", 20) }
        },
12: {
            name() { return 'f镀金'},
            challengeDescription() { return '禁用p层级,复制点软上限从1e100开始，基于镀金内最高复制点获得分数.'},
            rewardDescription() { 
                return `镀金分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let re=new Decimal(0)
              if(inChallenge("a",12))  re=re.max(player.f.points.add(1).log10().add(1).log10()).max(challengeEffect("a", 12))
 if(!inChallenge("a",12))re=re.max(player.a.challenges[12])
return re
            },
            goal: 0,

            onExit() {
                player.a.challenges[12] = player.f.points.add(1).log10().add(1).log10().max(challengeEffect("a", 12)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.f.points },
            unlocked() { return  hasMilestone("a", 24) }
        }
    },
    update(diff) {
        player.a.sp = player.a.sp.add(this.spg().mul(diff))
        
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "a: 进行冲击重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade("p",25)||player.a.points.gte(1) }

})
