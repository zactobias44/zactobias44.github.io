## 9/13/24 Pooling BRB-seq on robot

Just real quick. I noticed that tip 6 (from top) was underpipetting on the addition of 4 ul on the fourt batch. So this should effect columns 19-24, rows K and L. This means that they are less 
dilute than the others and that these might end up getting more reads. Still hopefully will be more even than the first run. 

When pooling, we noticed that for A2 and A3 there was some suction and residual in tip after dispensing. Stopped robot and made new program with shallower surface teaching and new liquid settings to 
PCR mix. Just need to start from command five (b/c two commands for temp settings).

So we started the program and are just gonna let it go. There seems to be maybe a bit of suctioning, as well as some residual in tip, but I don't think there's a whole lot we can do. Certainly 
better than doing this all by hand.

While it's running I am going to work on the MiSeq Nano data. I've been running it through the pipeline and a playing around with the data in R.

I made a PCA (see below), and there is no real pattern when looking at ecotype. This makes sense, as our sequencing is super shallow and is only capturing very highly expressed genes. When I sorted 
the dataframe by colSums (to get most highly expressed genes), it's a bunch of housekeeping genes like hemaglobin, actin, keratin, CO1, etc. I wonder what this might look like with the deeper 
sequencing... Hopefully not like this!

![PCA](docs/assets/img/MiSeqNano_PCA.png) 

Okay finished pooling and then finished the next two steps (EXO and SSS) at the lab. 

8.87 ng/ul of cDNA! Onto tagmentation on Monday!
