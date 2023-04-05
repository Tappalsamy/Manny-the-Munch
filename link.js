class Link{
    constructor(a,b){
        var lastLink = a.body.bodies.length-2
        this.link = Constraint.create({
            bodyA:a.body.bodies[lastLink],
            bodyB:b,
            length:-10,
            stiffness:0.01
        })
        World.add(world,this.link)
    }
    erase(){
        World.remove(world,this.link)
    }
}