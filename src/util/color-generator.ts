export class ColorGenerator {

    static random() {
        return "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
    }
}