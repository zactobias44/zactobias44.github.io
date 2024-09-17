## 9/17/24 NCBI downloads, STARsolo testing, and hopefully a TapeStation result?

So the download of all of the publicly available NCBI data failed over the weekend. THe reason? THe harddrive filled up. Apparently it was more than 5 TB, even though I'm pretty sure I checked that 
it was below that threshold. It seems like the metadata in entrez-direct is not accurate, or I just calculated it wrong. Anyway, I just used bash commands to figure out which files were incomplete 
(by checking the nohup log file), deleted them, and then made a list of accessions that were not downloaded by comparing the filenames in the dl directory to those from the dltable.csv.

I also added a line to the download script that will compress the output. Hopefully that will buy us enough space... Right now I am just compressing  the already downloaded files. Once that's done 
(who knows how long that will take), I'll start the download script again but with dltable2.csv

Meanwhile, I am trying to figure out why my alignment rate was so low for the MiSeq Nano data with STARsolo. Diana thinks that I should be mapping to the transcriptome instead of the genome... I 
think the documentation says to do genome but I will double check. That would certainly explain it. I could also try using less stringent mapping parameters. Maybe it's something particular to this 
BRB-seq method? But Grace said she got >70% and that labmates using stickleback got >80%. Hmmmm. We'll see.
