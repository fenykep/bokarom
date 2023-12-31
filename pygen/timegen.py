from datetime import datetime, timedelta

# Define the starting time
start_time = datetime.strptime("8:00", "%H:%M")

text='''<tr>                                                                            
    <td>{}</td>
    <td id="dr{}">Data</td>
    <td id="dr{}">Data</td>
    <td id="dr{}">Data</td>
    <td id="dr{}">Data</td>
    <td id="dr{}">Data</td>
</tr>'''

# Create a list to store the incremental instances
time_instances = []
counter = 0
ids=[0,40,80,120, 160]
finids=["000","000","000","000","000"]

# Generate 40 incremental instances
# Here you can change 40*15 or 10*60 for resolution
for i in range(10):
    time_instances.append(start_time.strftime("%H:%M"))
    start_time += timedelta(minutes=60)

# Print the list of time instances
for time in time_instances:
    # print(time)
    for oneid in ids:
        finids[ids.index(oneid)]=str(oneid+counter).zfill(3)
    print(text.format(time,*finids))
    #print(str(counter).zfill(3))
    # youll also have to change this var for resolution
    counter+=4

