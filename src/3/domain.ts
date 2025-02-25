export class Motor {
    private isRunning: boolean = false;

    start(): void {
        this.isRunning = true;
        console.log("Мотор зажужжал.");
    }

    stop(): void {
        this.isRunning = false;
        console.log("Мотор остановился.");
    }

    isMotorRunning(): boolean {
        return this.isRunning;
    }
}

export class Spaceship {
    private motor: Motor;
    private isInSpace: boolean = false;
    private passengers: Character[] = [];

    constructor(motor: Motor) {
        this.motor = motor;
    }

    launch(): void {
        this.motor.start();
        this.isInSpace = true;
        console.log("Космический корабль вылетел в открытый космос.");
    }

    isSpaceshipInSpace(): boolean {
        return this.isInSpace;
    }

    addPassenger(passenger: Character): void {
        this.passengers.push(passenger);
    }

    getPassengers(): Character[] {
        return this.passengers;
    }
}

export class Space {
    private stars: string[] = ["яркая точка 1", "яркая точка 2", "яркая точка 3"];
    private spaceship: Spaceship | null = null;

    enterSpaceship(spaceship: Spaceship): void {
        this.spaceship = spaceship;
        console.log("Космический корабль вошел в космос.");
    }

    getStars(): string[] {
        return this.stars;
    }

    isSpaceshipInSpace(): boolean {
        return this.spaceship !== null && this.spaceship.isSpaceshipInSpace();
    }
}

export class Character {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}