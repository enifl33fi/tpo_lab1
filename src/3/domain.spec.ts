import { Motor, Spaceship, Space, Character } from './domain';
import {describe, expect, test, beforeEach, jest} from '@jest/globals';

describe('Restore text fragments using domain model', () => {
    let motor: Motor;
    let spaceship: Spaceship;
    let space: Space;
    let ford: Character;
    let arthur: Character;

    beforeEach(() => {
        motor = new Motor();
        spaceship = new Spaceship(motor);
        space = new Space();
        ford = new Character("Форд");
        arthur = new Character("Артур");
    });

    test('should restore the fragment about the motor', () => {
        motor.start();
        expect(motor.isMotorRunning()).toBe(true);
        console.log = jest.fn();
        motor.start();
        expect(console.log).toHaveBeenCalledWith("Мотор зажужжал.");
    });

    test('should restore the fragment about the spaceship launching into space', () => {
        spaceship.launch();
        expect(spaceship.isSpaceshipInSpace()).toBe(true);
        expect(motor.isMotorRunning()).toBe(true);
        console.log = jest.fn();
        spaceship.launch();
        expect(console.log).toHaveBeenCalledWith("Космический корабль вылетел в открытый космос.");
    });

    test('should restore the fragment about characters in space', () => {
        spaceship.addPassenger(ford);
        spaceship.addPassenger(arthur);

        spaceship.launch();

        space.enterSpaceship(spaceship);

        expect(space.isSpaceshipInSpace()).toBe(true);

        const passengers = spaceship.getPassengers();
        expect(passengers).toContain(ford);
        expect(passengers).toContain(arthur);

        expect(spaceship.isSpaceshipInSpace()).toBe(true);
        expect(motor.isMotorRunning()).toBe(true);
    });

    test('should restore the fragment about stars in space', () => {
        const stars = space.getStars();
        expect(stars.length).toBeGreaterThan(0);
        expect(stars.join(", ")).toContain("яркая точка");
    });
});