import SentenceDecoder from "./SentenceDecoder";

const MATCH_LIMIT = 2;
const COMMON_WORDS = [
  "olla",
  "ja",
  "se",
  "ei",
  "tai",
  "joka",
  "että",
  "hän",
  "voida",
  "saada",
  "jopa",
  "koska",
  "kun",
  "oli",
  "on",
  "sekä",
  "niin",
  "kuin",
  "mutta",
  "ottaa",
  "ovat",
  "lisäksi",
  "tulee",
  "enää",
  "ollut"
];

interface BullshitResult {
  sentence: string;
  isBullshit: boolean;
}

export class BullshitDetector {
  constructor(private sentence: string, private decoders: SentenceDecoder[]) {}

  detect(): BullshitResult {
    for (let decoder of this.decoders) {
      const decodedSentence = decoder.decode(this.sentence);
      if (this.isNotBullshit(decodedSentence)) {
        return {
          sentence: decodedSentence,
          isBullshit: false
        };
      }
    }
    return {
      sentence: this.sentence,
      isBullshit: true
    };
  }

  /**
   * Match sentence words to COMMON_WORDS list and if matchCount === MATCH_LIMIT then sentence is not bullshit
   * @param decodedSentence
   */
  private isNotBullshit(decodedSentence: string): boolean {
    const words = decodedSentence.split(" ");
    let matchCount = 0;
    for (let word of words) {
      if (COMMON_WORDS.indexOf(word) !== -1) {
        matchCount++;
      }
      if (matchCount === MATCH_LIMIT) return true;
    }
    return false;
  }
}
