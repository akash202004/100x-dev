# WebRTC Overview

## Why WebRTC?
WebRTC is the core/only protocol that enables real-time media communication directly within a browser.

### Key Features:
- Enables sub-second latency.
- Used in applications like:
  - **Multi-party calls** (Zoom, Google Meet)
  - **1:1 calls** (Omegle, online teaching)
  - **Real-time data transfer** (e.g., 30FPS games)

We have already implemented this in a live stream:
- [GitHub Repository](https://github.com/hkirat/omegle/tree/master)
- [YouTube Video](https://www.youtube.com/watch?v=0MIsI2xh9Zk)

## WebRTC Architecture & Jargon

### Peer-to-Peer (P2P)
WebRTC is a **peer-to-peer** protocol, meaning media is sent directly between users without a central server. However, a central server is required for **signaling** and sometimes for **relaying media** (via a TURN server).

![](./images/one.webp)

### Signaling Server
Before browsers can communicate, they must exchange connection details. A **signaling server** facilitates this exchange. It is typically a **WebSocket server**, but HTTP can also be used.

![](./images/two.webp)

### STUN (Session Traversal Utilities for NAT)
A **STUN server** helps discover your **publicly accessible IP address**. It allows the browser to determine how it appears to external networks.

![](./images/three.webp)

![](./images/four.webp)

- Check your ICE candidates: [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

### ICE Candidates (Interactive Connectivity Establishment)
ICE candidates represent potential networking endpoints for establishing a connection between peers. Examples:
- **Same network** (e.g., two friends in a hostel using WiFi) → **Private router ICE candidates**
- **Different countries** → **Public IP-based connection**

### TURN Server
If a network is too restrictive, direct peer-to-peer media transmission may be blocked. In such cases, a **TURN (Traversal Using Relays around NAT) server** is used to relay media through a known intermediary.

![](./images/five.webp)

### Offer & Answer
- **Offer**: The first browser (initiator) sends its ICE candidates.
- **Answer**: The receiving browser sends back its ICE candidates.

### SDP (Session Description Protocol)
SDP is a **single file** containing:
- ICE candidates
- Media types and formats
- Encoding protocols

This file is sent during the **offer** and received in the **answer**.

#### Example SDP:
```sdp
v=0
o=- 423904492236154649 2 IN IP4 127.0.0.1
s=-
t=0 0
m=audio 49170 RTP/AVP 0
c=IN IP4 192.168.1.101
a=rtpmap:0 PCMU/8000
a=ice-options:trickle
a=candidate:1 1 UDP 2122260223 192.168.1.101 49170 typ host
a=candidate:2 1 UDP 2122194687 10.0.1.1 49171 typ host
a=candidate:3 1 UDP 1685987071 93.184.216.34 49172 typ srflx raddr 10.0.1.1 rport 49171
a=candidate:4 1 UDP 41819902 10.1.1.1 3478 typ relay raddr 93.184.216.34 rport 49172
```

### RTCPeerConnection
[RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) is a browser API that:
- Manages **SDP exchange**
- Creates **offers/answers**
- Sends **media and data**

## Summary
- A **signaling server** and **STUN server** are required to establish a WebRTC connection.
- Once connected, these servers can be shut down.
- A **TURN server** is needed if users are behind a restrictive network.

![](./images/six.png)