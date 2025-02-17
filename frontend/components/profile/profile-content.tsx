// "use client";

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/components/auth/auth-context"; // ✅ Get user auth context

// interface ProfileData {
//   name: string;
//   email: string;
//   age?: number;
//   userType?: string;
//   whySponsorMe?: string;
//   sport?: string;
// }

// export function ProfileContent() {
//   const { userId } = useAuth(); // ✅ Get logged-in user ID
//   const [profile, setProfile] = useState<ProfileData>({
//     name: "",
//     email: "",
//     age: undefined,
//     userType: "",
//     whySponsorMe: "",
//     sport: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/user/profile`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           setProfile(data);
//           localStorage.setItem("profile", JSON.stringify(data));
//         } else {
//           setError("Failed to load profile.");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setError("Error fetching profile. Please try again.");
//       }
//     };
//     fetchProfile();
//     const savedProfile = localStorage.getItem("profile");
//     if (savedProfile) {
//       setProfile(JSON.parse(savedProfile));
//     } else {
//       fetchProfile();
//     }
//   }, [userId]);

//   const calculateAge = (birthdate: string) => {
//     const birthDate = new Date(birthdate);
//     const today = new Date();
//     return today.getFullYear() - birthDate.getFullYear();
//   };

//   // ✅ Handle Input Changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     if (!userId) {
//       setError("User ID is missing. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:5000/api/user/profile`, { // ✅ USES THE CORRECT ROUTE
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is present
//         },
//         body: JSON.stringify(profile),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setIsEditing(false);
//         setProfile(data.user);
//         localStorage.setItem("profile", JSON.stringify(data.user));
//       } else {
//         setError(data.message || "Failed to update profile.");
//       }
//     } catch (error) {
//       setError("Error updating profile. Please try again.");
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold">Profile Info</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       {isEditing ? (
//         <>
//           <div className="mt-4">
//             <label className="text-gray-500">Name:</label>
//             <Input name="name" value={profile.name} onChange={handleChange} />
//           </div>
//           <div className="mt-4">
//             <label className="text-gray-500">Email:</label>
//             <Input name="email" value={profile.email} onChange={handleChange} />
//           </div>
//           <div className="mt-4">
//             <label className="text-gray-500">Sport</label>
//             <textarea
//               name="sport"
//               value={profile.sport}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               rows={1}
//               placeholder="whats your Passion?"
//             />
//           </div>
//           <div className="mt-4">
//             <label className="text-gray-500">Why Sponsor Me?</label>
//             <textarea
//               name="whySponsorMe"
//               value={profile.whySponsorMe}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               rows={3}
//               placeholder="Describe why someone should sponsor you..."
//             />
//           </div>

//           <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleUpdate} disabled={loading}>
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//         </>
//       ) : (
//         <>
//           <p className="mt-4"><strong>Name:</strong> {profile.name}</p>
//           <p className="mt-2"><strong>Email:</strong> {profile.email}</p>
//           <p className="mt-2"><strong>Age:</strong> {profile.age || "N/A"}</p>
//           <p className="mt-2"><strong>User Type:</strong> {profile.userType || "N/A"}</p>
//           <p className="mt-2"><strong>Sport:</strong> {profile.sport}</p>
//           <p className="mt-2"><strong>Why Sponsor Me?</strong> {profile.whySponsorMe || "Not specified"}</p>

//           <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
//             Edit Profile
//           </Button>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-context";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Save, X } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  age?: number;
  userType?: string;
  whySponsorMe?: string;
  sport?: string;
}

export function ProfileContent() {
  const { userId } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    age: undefined,
    userType: "",
    whySponsorMe: "",
    sport: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();

        if (response.ok) {
          setProfile(data);
          localStorage.setItem("profile", JSON.stringify(data));
        } else {
          setError("Failed to load profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile. Please try again.");
      }
    };

    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/user/profile`, { // ✅ USES THE CORRECT ROUTE
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        setProfile(data.user);
        localStorage.setItem("profile", JSON.stringify(data.user));
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-600 text-white">
          <CardTitle className="text-2xl font-semibold">Profile Info</CardTitle>
          {isEditing ? (
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="bg-white text-blue-600 hover:bg-blue-100"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent className="mt-4">
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mb-4"
            >
              {error}
            </motion.p>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  // className={!isEditing ? "text-black" : ""}
                  className="text-black bg-white border border-gray-300 disabled:bg-white disabled:text-black disabled:border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={profile.age || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Input
                  id="userType"
                  name="userType"
                  value={profile.userType || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "text-black" : ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Input
                id="sport"
                name="sport"
                value={profile.sport || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="What's your passion?"
                className={!isEditing ? "text-black" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whySponsorMe">Why Sponsor Me?</Label>
              <Textarea
                id="whySponsorMe"
                name="whySponsorMe"
                value={profile.whySponsorMe || ""}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Describe why someone should sponsor you..."
                rows={3}
                className={!isEditing ? "text-black" : ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
