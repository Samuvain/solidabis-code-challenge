import axios from "axios";

interface Bullshits {
  bullshits: Bullshit[];
}

interface Bullshit {
  message: string;
}

const BULLSHIT_URL =
  "https://us-central1-test-208710.cloudfunctions.net/findBullshit";

export const fetchBullshit = async (): Promise<Bullshit[]> => {
  return await axios
    .get<Bullshits>(BULLSHIT_URL)
    .then(resp => resp.data.bullshits);
};
