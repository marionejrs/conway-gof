import Cell from './Cell';
import { deepCopy } from '../Util';

export default class Ecosystem {
    grid : Cell[][];
    numOfRows : number;
    numOfColumns : number;

    constructor(numOfRows : number, numOfColumns : number) {
        this.grid = [];
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
            let golRow : Cell[] = [];
            for (let colIndex = 0; colIndex < numOfColumns; colIndex++) {
                let clusterNode = new Cell(colIndex, rowIndex);
                clusterNode.isAlive = Math.floor(Math.random() * 200) % 3 === 0;
                golRow.push(clusterNode);
            }
            this.grid.push(golRow);
        }
    }

    getGrid() {
        return this.grid;
    }

    toggleAlive(cell : Cell) {
        console.log(cell)
        console.log(this.grid)
        console.log(this.grid[cell.y])
        let row = this.grid[cell.y]
        row[cell.x].isAlive = !cell.isAlive
    }

    clone() {
        let newEcosystem = new Ecosystem(this.numOfRows, this.numOfColumns);
        newEcosystem.grid = Object.assign([], this.grid);
        return newEcosystem;
    }

    massExtinction() {
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            let currentRow : Cell[] = this.grid[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                let cell = currentRow[colIndex];
                cell.isAlive = false;
            }
        }
    }

    triggerNewGeneration() {
        let newGeneration : Cell[][] = [];
        for (let rowIndex = 0; rowIndex < this.numOfRows; rowIndex++) {
            let golRow : Cell[] = [];
            for (let colIndex = 0; colIndex < this.numOfColumns; colIndex++) {
                let clusterNode = new Cell(colIndex, rowIndex);
                clusterNode.isAlive = Math.floor(Math.random() * 200) % 2 === 0;
                golRow.push(clusterNode);
            }
            newGeneration.push(golRow);
        }
        
        for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
            let previousRow = this.grid[rowIndex - 1];
            let currentRow : Cell[] = this.grid[rowIndex];
            let nextRow : Cell[] = this.grid[rowIndex + 1];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                let cell = {...currentRow[colIndex]};
                let aliveNeighborCount = 0;

                if (previousRow) {
                    if (previousRow[colIndex - 1] && previousRow[colIndex - 1].isAlive) {
                        aliveNeighborCount++;
                    }

                    if (previousRow[colIndex] && previousRow[colIndex].isAlive) {
                        aliveNeighborCount++;
                    }

                    if (previousRow[colIndex + 1] && previousRow[colIndex + 1].isAlive) {
                        aliveNeighborCount++;
                    }
                }

                if (currentRow) {
                    if (currentRow[colIndex - 1] && currentRow[colIndex - 1].isAlive) {
                        aliveNeighborCount++;
                    }

                    if (currentRow[colIndex + 1] && currentRow[colIndex + 1].isAlive) {
                        aliveNeighborCount++;
                    }
                }

                if (nextRow) {
                    if (nextRow[colIndex - 1] && nextRow[colIndex - 1].isAlive) {
                        aliveNeighborCount++;
                    }

                    if (nextRow[colIndex] && nextRow[colIndex].isAlive) {
                        aliveNeighborCount++;
                    }

                    if (nextRow[colIndex + 1] !== undefined && nextRow[colIndex + 1].isAlive) {
                        aliveNeighborCount++;
                    }
                }

                // let aliveNeighborCount = this.getAliveNeighborCount(cell);
                if (aliveNeighborCount > 0) {
                    console.log(aliveNeighborCount)
                }
                if (cell.isAlive) {
                    if (aliveNeighborCount < 2) {
                        cell.isAlive = false;
                    }
                    else if (aliveNeighborCount === 2 || aliveNeighborCount === 3) {
                        cell.isAlive = true;
                    }
                    else if (aliveNeighborCount > 3) {
                        cell.isAlive = false;
                    }
                    // if (aliveNeighborCount === 2 || aliveNeighborCount === 3) {
                    //     cell.isAlive = true;
                    // }
                    // else if (aliveNeighborCount > 3 || aliveNeighborCount < 2) {
                    //     cell.isAlive = false;
                    // }
                }
                else {
                    if (aliveNeighborCount === 3) {
                        cell.isAlive = true;
                    }
                }

                newGeneration[rowIndex][colIndex] = {...cell};
            }
        }
        this.grid = newGeneration.slice();
    }

    getPopulation() : number {
        let population = 0;
        for (let row of this.grid) {
            population += row.filter(cell => cell.isAlive).length;
        }
        return population;
    }

    getAliveNeighborCount(cell : Cell) {
        let count = 0;
        let { x, y } = cell;
        if (this.grid) {
            let column = this.grid[x - 1];
            if (column) {
                if (y - 1 > 0 && column[y - 1].isAlive) {
                    count++;
                }

                if (column[y].isAlive) {
                    count++;
                }

                if (y + 1 < this.numOfRows && column[y + 1].isAlive) {
                    count++;
                }
            }

            column = this.grid[x];
            if (column) {
                if (y - 1 > 0 && column[y - 1].isAlive) {
                    count++;
                }

                if (y + 1 < this.numOfRows && column[y + 1].isAlive) {
                    count++;
                }
            }

            column = this.grid[x + 1];
            if (column) {
                if (y - 1 > 0 && column[y - 1].isAlive) {
                    count++;
                }

                if (column[y].isAlive) {
                    count++;
                }

                if (y + 1 < this.numOfRows && column[y + 1].isAlive) {
                    count++;
                }
            }

            
        }
        return count;
    }
}