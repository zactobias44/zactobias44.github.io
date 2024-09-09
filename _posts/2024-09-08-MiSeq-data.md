## 9/9/24 MiSeq data, Qubitting, and starting new extractions

So last Friday I got the MiSeq data back. I just did a quick grep -c using the barcodes as the pattern and the fastq as the target file. I took those values (number of reads per sample) and put them 
in the extractions spreadsheet to figure out how much ul to pool from each well of the 384-well reaction plate. I am going to drop 8 samples for having too low of reads (even if I pooled full sample 
volume, I wouldn't get close to having the same amount of reads as the "average" samples). Three of these are from Stella, so we'll just have 17 samples for that population. Not a big deal. On 
Friday I am going back to Ariel's to pool the samples. Hopefully that doesn't take too long, because then I will have to do the free primer digestion and second strand synthesis by the end of the 
day. May be a long one...

In other news, I am also downloading a bunch of the NCBI stickleback data onto one of the lab hard drives. It's something like 3 TB. Using fasterq-dump. There seem to be some errors in retrieving 
some runs, so I'll troubleshoot that when it's done. It's been running all weekend....

Also qubitting the extractions from last week. Most were successfull, with yields between 7-250 ng/ul. One was TOO LOW, so will have to re-do. Looking at muscle vs. fin, it looks like fin is 
superior in terms of quantity, so let's proceed with that. All data are in the 2024_BC_DNA_extractions.xlsx spreadsheet.
