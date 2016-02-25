/**
A class to sort dictionary words by word length
Writes them to a new dictionary file
*/

import java.io.File;
import java.util.Scanner;
import java.io.PrintWriter;

public class sort {

	//word length field
	private static final int WORD_LENGTH = 4;

	public static void main(String[] args) {

		File dict = new File("dict.txt");

		File dict4 = new File("dict4.txt");

		//scanner for input file
		Scanner scan = null;
		try {
			scan = new Scanner(dict);
		}
		catch (java.io.FileNotFoundException e) {
			System.out.println("Problem with Scanner from input file");
			System.exit(1);
		}

		//printwriter for output file
		PrintWriter writer = null;
		try {
			writer = new PrintWriter(dict4);
		}
		catch (java.io.FileNotFoundException e) {
			System.out.println("Problem with PrintWriter for output file");
			System.exit(1);
		}


		//actual conversion
		while(scan.hasNextLine()) {

			char[] word = scan.nextLine().toCharArray();
			if(word.length == WORD_LENGTH) {
				for(char c : word)
					writer.print(c);
				writer.println();
			}
		}
		writer.flush();
		writer.close();
	}
}
