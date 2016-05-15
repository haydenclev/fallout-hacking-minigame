/**
A class to sort dictionary words by word length
Writes them to a new dictionary file
*/

import java.io.File;
import java.util.Scanner;
import java.io.PrintWriter;

public class sort {

	public static void main(String[] args) {

		//word length
		Scanner input = new Scanner(System.in);
		System.out.print("Enter desired dictionary word length: ");
		int wordLength= input.nextInt();

		File dict = new File("dict.txt");

		File newDict = new File("dict" + wordLength + ".txt");

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
			writer = new PrintWriter(newDict);
		}
		catch (java.io.FileNotFoundException e) {
			System.out.println("Problem with PrintWriter for output file");
			System.exit(1);
		}


		//actual conversion
		while(scan.hasNextLine()) {

			char[] word = scan.nextLine().toCharArray();
			if(word.length == wordLength) {
				for(char c : word)
					writer.print(c);
				writer.println();
			}
		}
		writer.flush();
		writer.close();
	}
}
