
// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// export function ProfileInfo() {
//   const [profile, setProfile] = useState({
//     birthdate: "",
//     gender: "",
//     location: "",
//     profileStatus: "",
//     team: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await fetch("http://localhost:5000/api/user/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
  
//         if (!response.ok) throw new Error("Failed to fetch profile");
  
//         const data = await response.json();
  
//         if (data && data.user) {
//           setProfile({
//             birthdate: data.user.primaryInfo?.birthdate ?? "",
//             gender: data.user.primaryInfo?.gender ?? "",
//             location: data.user.primaryInfo?.location ?? "",
//             profileStatus: data.user.moreInfo?.profileStatus ?? "",
//             team: data.user.moreInfo?.team ?? "",
//           });
//         } else {
//           throw new Error("Invalid user data received");
//         }
//       } catch (err) {
//         setError((err as Error).message || "Failed to fetch profile.");
//       }
//     }
  
//     fetchProfile();
//   }, []);
  
//   const handleSave = async () => {
//     setLoading(true);
//     setError(null);
  
//     try {
//       const response = await fetch("http://localhost:5000/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(profile),
//       });
  
//       const data = await response.json();
  
//       if (response.ok && data.user) {
//         setProfile({
//           birthdate: data.user.primaryInfo?.birthdate ?? "",
//           gender: data.user.primaryInfo?.gender ?? "",
//           location: data.user.primaryInfo?.location ?? "",
//           profileStatus: data.user.moreInfo?.profileStatus ?? "",
//           team: data.user.moreInfo?.team ?? "",
//         });
//       } else {
//         throw new Error(data.message || "Failed to update profile.");
//       }
//     } catch (err) {
//       setError((err as Error).message || "Error updating profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full lg:w-80 space-y-6"
//     >
//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {/* Primary Info Section */}
//       <section className="bg-white rounded-lg shadow-sm p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">PRIMARY INFO</h2>
//           <Button variant="ghost" size="sm" onClick={handleSave} disabled={loading}>
//             {loading ? "Saving..." : "SAVE"}
//           </Button>
//         </div>
//         <div className="space-y-2">
//           <input
//             type="date"
//             value={profile.birthdate}
//             onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
//             className="w-full py-2 border rounded-lg"
//             placeholder="Add Birthdate"
//           />
//           <input
//             type="text"
//             value={profile.gender}
//             onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
//             className="w-full py-2 border rounded-lg"
//             placeholder="Add Gender"
//           />
//           <input
//             type="text"
//             value={profile.location}
//             onChange={(e) => setProfile({ ...profile, location: e.target.value })}
//             className="w-full py-2 border rounded-lg"
//             placeholder="Add Location"
//           />
//         </div>
//       </section>

//       {/* More Info Section */}
//       <section className="bg-white rounded-lg shadow-sm p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">MORE INFO</h2>
//           <Button variant="ghost" size="sm" onClick={handleSave} disabled={loading}>
//             {loading ? "Saving..." : "SAVE"}
//           </Button>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <h3 className="text-sm font-medium text-slate-600">PROFILE STATUS</h3>
//             <input
//               type="text"
//               value={profile.profileStatus}
//               onChange={(e) => setProfile({ ...profile, profileStatus: e.target.value })}
//               className="w-full py-2 border rounded-lg"
//               placeholder="Profile Status"
//             />
//           </div>
//           <div>
//             <h3 className="text-sm font-medium text-slate-600">TEAM</h3>
//             <input
//               type="text"
//               value={profile.team}
//               onChange={(e) => setProfile({ ...profile, team: e.target.value })}
//               className="w-full py-2 border rounded-lg"
//               placeholder="Add Team"
//             />
//           </div>
//         </div>
//       </section>
//     </motion.div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ProfileInfo() {
  const [profile, setProfile] = useState({
    birthdate: "",
    gender: "",
    location: "",
    profileStatus: "",
    team: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch Profile on Component Mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        if (data && data.user) {
          setProfile({
            birthdate: data.user.primaryInfo?.birthdate
              ? new Date(data.user.primaryInfo.birthdate).toISOString().split("T")[0]
              : "",
            gender: data.user.primaryInfo?.gender || "",
            location: data.user.primaryInfo?.location || "",
            profileStatus: data.user.moreInfo?.profileStatus || "",
            team: data.user.moreInfo?.team || "",
          });
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (err) {
        setError((err as Error).message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // ✅ Handle Save
  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setProfile({
          birthdate: data.user.primaryInfo?.birthdate
            ? new Date(data.user.primaryInfo.birthdate).toISOString().split("T")[0]
            : "",
          gender: data.user.primaryInfo?.gender || "",
          location: data.user.primaryInfo?.location || "",
          profileStatus: data.user.moreInfo?.profileStatus || "",
          team: data.user.moreInfo?.team || "",
        });

        setIsEditing(false);
      } else {
        throw new Error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      setError((err as Error).message || "Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-80 space-y-6"
    >
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Show a loading indicator while data is being fetched */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading profile...</p>
      ) : (
        <>
          {/* Primary Info Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">PRIMARY INFO</h2>
              {isEditing ? (
                <Button variant="ghost" size="sm" onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="date"
                value={profile.birthdate}
                onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                className="w-full py-2 border rounded-lg"
                placeholder="Add Birthdate"
                disabled={!isEditing}
              />
              <input
                type="text"
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full py-2 border rounded-lg"
                placeholder="Add Gender"
                disabled={!isEditing}
              />
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full py-2 border rounded-lg"
                placeholder="Add Location"
                disabled={!isEditing}
              />
            </div>
          </section>

          {/* More Info Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">MORE INFO</h2>
              {isEditing ? (
                <Button variant="ghost" size="sm" onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-600">PROFILE STATUS</h3>
                <input
                  type="text"
                  value={profile.profileStatus}
                  onChange={(e) => setProfile({ ...profile, profileStatus: e.target.value })}
                  className="w-full py-2 border rounded-lg"
                  placeholder="Profile Status"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">TEAM</h3>
                <input
                  type="text"
                  value={profile.team}
                  onChange={(e) => setProfile({ ...profile, team: e.target.value })}
                  className="w-full py-2 border rounded-lg"
                  placeholder="Add Team"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
