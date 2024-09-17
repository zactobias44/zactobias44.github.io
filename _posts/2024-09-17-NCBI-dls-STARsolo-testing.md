## 9/17/24 NCBI downloads, STARsolo testing, and hopefully a TapeStation result?

So the download of all of the publicly available NCBI data failed over the weekend. THe reason? THe harddrive filled up. Apparently it was more than 5 TB, even though I'm pretty sure I checked that 
it was below that threshold. It seems like the metadata in entrez-direct is not accurate, or I just calculated it wrong. Anyway, I just used bash commands to figure out which files were incomplete 
(by checking the nohup log file), deleted them, and then made a list of accessions that were not downloaded by comparing the filenames in the dl directory to those from the dltable.csv.

I also added a line to the download script that will compress the output. Hopefully that will buy us enough space... Right now I am just compressing  the already downloaded files. Once that's done 
(who knows how long that will take), I'll start the download script again but with dltable2.csv

Meanwhile, I am trying to figure out why my alignment rate was so low for the MiSeq Nano data with STARsolo. Diana thinks that I should be mapping to the transcriptome instead of the genome... I 
think the documentation says to do genome but I will double check. That would certainly explain it. I could also try using less stringent mapping parameters. Maybe it's something particular to this 
BRB-seq method? But Grace said she got >70% and that labmates using stickleback got >80%. Hmmmm. We'll see.

So I've tried it with less stringent parameters, and going as low as 0.3 overlap takes it to just 62% alignment rate. Rate of multimappers goes to 10% also. I wonder if this contains a lot of false 
positives. It's certainly better than 48%, but not as good as it could be. Next I will try to map to the cds.

Also, I realized that the reason my NCBI downloads filled up the hard drive is that the file size i got from entrez-direct was the size of the .sra, not fastq. SRA are binary so much smaller. So I'm 
gzipping everything now, but still not sure that will get us there... We'll see. We might need a larger drive, or multiple.

Okay back to STAR. So I found this comment in a STAR issue ![thread](https://github.com/alexdobin/STAR/issues/455) on GitHub saying that adapter trimming is necessary for short RNA sequencing. I 
think this is meant more for small RNAs instead of 
this 3' stuff, but anyway, maybe I should try trimming first? This should only really matter if the read length is longer than the insert, which it shouldn't be since my peak was around 430bp. Ahh 
who knows.

Okay so I trimmed the R2 file with bbduk using the provided adapters.fa file and it boosted our mapping rate to 65% with default parameters. Pretty good! I am also looping over the stringency 
parameters with the trimmed and got as high as 84%, but thats with minoverlap to 0.3... Anyway, moving in the right direction!
