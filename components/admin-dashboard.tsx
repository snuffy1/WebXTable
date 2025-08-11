"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, LogOut, Save, X } from "lucide-react";
import {
  getLeaderboardData,
  saveLeaderboardData,
  type LeaderboardEntry,
} from "@/lib/storage";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState<Partial<LeaderboardEntry>>({});
  const router = useRouter();

  useEffect(() => {
    setData(getLeaderboardData());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEdit = (entry: LeaderboardEntry) => {
    setEditingId(entry.id);
    setEditForm(entry);
  };

  const handleSave = () => {
    if (!editingId || !editForm.name) return;

    const updatedData = data
      .map((entry) =>
        entry.id === editingId
          ? {
              ...entry,
              ...editForm,
              totalScore:
                (editForm.motivation || 0) +
                (editForm.discipline || 0) +
                (editForm.punctuality || 0) +
                (editForm.works || 0) +
                (editForm.knowledge || 0) +
                (editForm.achievement || 0),
            }
          : entry
      )
      .sort((a, b) => b.totalScore - a.totalScore);

    setData(updatedData);
    saveLeaderboardData(updatedData);
    setEditingId(null);
    setEditForm({});

    // Dispatch custom event to update public view
    window.dispatchEvent(new CustomEvent("leaderboard-updated"));
  };

  const handleDelete = (id: string) => {
    // Add confirmation dialog before proceeding
    if (window.confirm("Are you sure you want to delete this member?")) {
      const updatedData = data.filter((entry) => entry.id !== id);
      setData(updatedData);
      saveLeaderboardData(updatedData);
      window.dispatchEvent(new CustomEvent("leaderboard-updated"));
    }
  };
  const handleAdd = () => {
    if (!editForm.name) return;

    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: editForm.name,
      motivation: editForm.motivation || 0,
      discipline: editForm.discipline || 0,
      punctuality: editForm.punctuality || 0,
      works: editForm.works || 0,
      knowledge: editForm.knowledge || 0,
      achievement: editForm.achievement || 0,
      totalScore:
        (editForm.motivation || 0) +
        (editForm.discipline || 0) +
        (editForm.punctuality || 0) +
        (editForm.works || 0) +
        (editForm.knowledge || 0) +
        (editForm.achievement || 0),
    };

    const updatedData = [...data, newEntry].sort(
      (a, b) => b.totalScore - a.totalScore
    );
    setData(updatedData);
    saveLeaderboardData(updatedData);
    setShowAddForm(false);
    setEditForm({});
    window.dispatchEvent(new CustomEvent("leaderboard-updated"));
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-400 text-black";
    if (rank === 2) return "bg-yellow-600 text-black";
    if (rank === 3) return "bg-yellow-800 text-white";
    return "bg-gray-600 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#25798e] hover:bg-green-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {showAddForm && (
          <Card className="mb-6 bg-gray-800/50 border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Add New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-white">Name</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Motivation</Label>
                  <Input
                    type="number"
                    value={editForm.motivation || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        motivation: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Discipline</Label>
                  <Input
                    type="number"
                    value={editForm.discipline || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        discipline: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Punctuality</Label>
                  <Input
                    type="number"
                    value={editForm.punctuality || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        punctuality: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Works</Label>
                  <Input
                    type="number"
                    value={editForm.works || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        works: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Knowledge</Label>
                  <Input
                    type="number"
                    value={editForm.knowledge || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        knowledge: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Achievement</Label>
                  <Input
                    type="number"
                    value={editForm.achievement || 0}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        achievement: Number(e.target.value),
                      })
                    }
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditForm({});
                  }}
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2    " />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gray-800/50 border-yellow-400/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-400/20">
                  <th className="text-left p-4 text-yellow-400 font-semibold">
                    SN
                  </th>
                  <th className="text-left p-4 text-yellow-400 font-semibold">
                    Name
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Motivation (+1)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Discipline (+1)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Punctuality (+1)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Works (+1)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Knowledge (+10)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Achievement (+5)
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Total
                  </th>
                  <th className="text-center p-4 text-yellow-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-gray-700/50">
                    <td className="p-4">
                      <Badge className={getRankBadgeColor(index + 1)}>
                        {index + 1}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {editingId === entry.id ? (
                        <Input
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {entry.name}
                        </span>
                      )}
                    </td>
                    {[
                      "motivation",
                      "discipline",
                      "punctuality",
                      "works",
                      "knowledge",
                      "achievement",
                    ].map((field) => (
                      <td key={field} className="p-4 text-center">
                        {editingId === entry.id ? (
                          <Input
                            type="number"
                            value={
                              editForm[field as keyof LeaderboardEntry] || 0
                            }
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                [field]: Number(e.target.value),
                              })
                            }
                            className="bg-gray-700 border-gray-600 text-white w-20 mx-auto"
                          />
                        ) : (
                          <span
                            className={
                              field === "knowledge" || field === "achievement"
                                ? "text-green-400"
                                : "text-green-400"
                            }
                          >
                            +{entry[field as keyof LeaderboardEntry]}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="p-4 text-center text-yellow-400 font-bold">
                      {editingId === entry.id
                        ? (editForm.motivation || 0) +
                          (editForm.discipline || 0) +
                          (editForm.punctuality || 0) +
                          (editForm.works || 0) +
                          (editForm.knowledge || 0) +
                          (editForm.achievement || 0)
                        : entry.totalScore}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {editingId === entry.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              className="bg-green-600 hover:bg-green-700 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              className="cursor-pointer"
                              size="sm"
                              onClick={() => {
                                setEditingId(null);
                                setEditForm({});
                              }}
                              variant="outline"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleEdit(entry)}
                              className="bg-transparent text-zinc-400 hover:bg-transparent hover:text-blue-400 cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDelete(entry.id)}
                              className="bg-transparent text-zinc-400 hover:bg-transparent hover:text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
