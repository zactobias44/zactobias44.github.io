## 9/11/24 Trying to run STAR and extractions

Yesterday and today doing 48 extractions each. Making my way through the samples. Finishes with 179, so almost halfway.

In other news, I am trying to use the MiSeq Nano data to run through the pipeline that I will eventually use with the AVITI BRB-seq data. Lot's of issues with installation.

First I just tried downloading the executable. It made the genome index just fine but then I got this error when trying to do the mapping:

`Transcriptome.cpp:18:Transcriptome: exiting because of INPUT FILE error: could not open input file /geneInfo.tab` 

This is despite that file existing within the proper directory.

So it turns out that this is a known issue that hasn't been resolved. Someone has a fix! [here!](https://github.com/alexdobin/STAR/issues/2142)

So you have to edit two lines of the code in SharedMemory.cpp, as instructed.

Then you have to comment out a line in the Makefile, as demonstrated [here!](https://github.com/alexdobin/STAR/issues/1754) 

Then you compile it using hombrew installed version of gcc, using the CXX argument to point to the install location of gcc

`make STARforMacStatic CXX=/opt/homebrew/Cellar/gcc/14.2.0/bin/gcc++-14`

This is all on the Darwin computer, by the way.

Then the compiler should work appropriately and you can (hopefully) build the genome index over again and then align reads to genome
