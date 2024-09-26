## 9/26/24 Testing picogreen

Yesterday we got the black 384-well plates in, so I did a little test with the PicoGreen. I did 40ul assays with 2ul of DNA. Max standard was 2000 ng/ml, which I didn't realize was higher than the 
maximum for picogreen.

Anyway, the top two standards, 1000 ng/ml and 2000 ng/ml were saturated (RFUs didn't increase above the 500 ng/ml standard #3. This was also seen in the samples (samples over 10 ng/ul were 
saturated), so it's definitely an issue with assay set up and not pipetting error or something. I am going to run another test today, but changing the assay volume to 80ul with 1ul of DNA, with a 
500 ng/ml max standard. This should mean the range of our assay is 0-40 ng/ul. This is how Ariel does it. I was just trying to save reagent because I am a cheapo, but 80 is the way to go. Good news 
is that the Qubit values for the input DNA was highly linear with the PicoGreen results. PicoGreen seemed to undermeasure relative to Qubit, but that could be due to systematic pipetting error or 
freeze/thaw. Shouldn't matter anyway if we are using all PicoGreen values for pooling. 

In other new, Caitlin's TapeStation trace came back and it looks really overfragmented. We read the protocol and it turns out that if you have samples in water or any no-EDTA buffer, you should 
exclude Reagent K2. Reagent K2 seems to reduce EDTA under-fragmentation, so removing it should help with overfragmentation. We can also reduce fragmentation time, but then we'd have to increase 
number of PCR cycles. It could also be a sample quality issue. We should run some of my newly extracted, recently collected fish on gDNA tape and compare to Caitlin's old samples. If there is no 
real difference, then it's a prep issue. If there is a difference, could be an issue with sample quality. It could be both sample quality and prep issues together...
