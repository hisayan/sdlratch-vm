const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const cast = require('../../util/cast');
const log = require('../../util/log');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';
/**
* Enum for micro:bit buttons.
* @readonly
* @enum {string}
*/
const VehicleDataMenu = {
    RPM: 'rpm',
    SPEED: 'speed',
    ACC_PEDAL_POSITION: 'accPedalPosition',
    ELECTRONIC_PARK_BREKE_STATUS: 'electronicParkBrakeStatus',
    PRNDL: 'prndl',
    TURN_SINGNAL: 'turnSignal',
    ANY: 'any'
};


// window.getVechicleDataEvent = new Event('sdl.getVehicleData');

class Scratch3Smartdevicelink {
    constructor(runtime) {
        this.runtime = runtime;
        this.hoge = false;

        // これは変化を捉えるようの
        this.vehicleData = {
            rpm: 0,
            speed: 0.00,
            accPedalPosition: 0.00,
            electronicParkBrakeStatus: 'CLOSED',
            prndl: 'PARK',
            turnSignal: 'OFF'
        };

        // こちらは、変数の変化を比較するときの保管場所 DeepCopy
        this.vehicleLastData = JSON.parse(JSON.stringify(this.vehicleData));

        // window.addEventListener('appresume', this.watch);
        window.addEventListener('sdl.getVehicleData', e => {
            this.watch(e);
        });
        // appresume
    }

    watch(e) {
        // eslint-disable-next-line no-console
        // console.log(e);
        if (typeof (e.vehicleData.prndl) !== 'undefined') this.vehicleData.prndl = e.vehicleData.prndl;
        if (typeof (e.vehicleData.speed) !== 'undefined') this.vehicleData.speed = e.vehicleData.speed;
        if (typeof (e.vehicleData.rpm) !== 'undefined') this.vehicleData.rpm = e.vehicleData.rpm;
        if (typeof (e.vehicleData.accPedalPosition) !== 'undefined') this.vehicleData.accPedalPosition = e.vehicleData.accPedalPosition;
        if (typeof (e.vehicleData.electronicParkBrakeStatus) !== 'undefined') this.vehicleData.electronicParkBrakeStatus = e.vehicleData.electronicParkBrakeStatus;
    }


    /**
    * @return {array} - text and values for each buttons menu element
    */
    get VEHICLE_DATA_MENU() {
        return [
            {
                text: 'RPM',
                value: VehicleDataMenu.RPM
            },
            {
                text: 'Speed',
                value: VehicleDataMenu.SPEED
            },
            {
                text: 'Accelerator Pedal Position',
                value: VehicleDataMenu.ACC_PEDAL_POSITION
            },
            {
                text: 'Electoronic Park Brake Status',
                value: VehicleDataMenu.ELECTRONIC_PARK_BREKE_STATUS
            },
            {
                text: 'PRNDL',
                value: VehicleDataMenu.PRNDL
            },
            // {
            //     text: 'ウィンカー',
            //     value: VehicleDataMenu.TURN_SINGNAL
            // }
            // {
            //     text: formatMessage({
            //         id: 'microbit.buttonsMenu.any',
            //         default: 'any',
            //         description: 'label for "any" element in button picker for micro:bit extension'
            //     }),
            //     value: MicroBitButtons.ANY
            // }
        ];
    }

    getInfo() {
        return {
            id: 'smartdevicelink',
            name: 'SDL',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'console.log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                },
                {
                    opcode: 'reporter1',
                    blockType: BlockType.REPORTER,
                    text: '[VEHICLE_DATA] の値',
                    arguments: {
                        VEHICLE_DATA: {
                            type: ArgumentType.STRING,
                            menu: 'vehicleData',
                            defaultValue: VehicleDataMenu.TURN_SINGNAL
                        }
                    }
                },
                {
                    opcode: 'event1',
                    blockType: BlockType.HAT,
                    text: '[VEHICLE_DATA] が変化したとき',
                    arguments: {
                        VEHICLE_DATA: {
                            type: ArgumentType.STRING,
                            menu: 'vehicleData',
                            defaultValue: VehicleDataMenu.TURN_SINGNAL
                        }
                    }
                }
            ],
            menus: {
                vehicleData: {
                    acceptReporters: true,
                    items: this.VEHICLE_DATA_MENU
                }
            }
        };
    }

    /**
     * data ssssd
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if the button is pressed.
     */
    // https://qiita.com/Hiroyuki_OSAKI/items/60a53e2eeedc22151524
    event1(args) {
        if (this.vehicleLastData[args.VEHICLE_DATA] !== this.vehicleData[args.VEHICLE_DATA]) {
            this.vehicleLastData[args.VEHICLE_DATA] = this.vehicleData[args.VEHICLE_DATA];
            return true;
        }
        return false;
    }

    reporter1(args) {
        // loop してる
        return this.vehicleData[args.VEHICLE_DATA];
    }

    writeLog(args) {
        const text = cast.toString(args.TEXT);
        log.log(text);
    }
}

module.exports = Scratch3Smartdevicelink;
