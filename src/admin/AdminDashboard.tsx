import { useEffect, useState } from "react";
import { fetchStudentsWithResults } from "@/lib/adminService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsWithResults().then((data) => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  /* ====== STATS ====== */
  const totalStudents = students.length;

  const scores = students
    .map((s) => s.latestResult?.totalScore)
    .filter((s) => typeof s === "number");

  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const maxScore = scores.length > 0 ? Math.max(...scores) : 0;

  return (
    <div className="min-h-screen bg-background p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          CET Mock Test – Student Performance Overview
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <h2 className="text-3xl font-bold">{totalStudents}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Average Score</p>
            <h2 className="text-3xl font-bold">{avgScore} / 150</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Highest Score</p>
            <h2 className="text-3xl font-bold text-green-600">
              {maxScore} / 150
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Student Results</h2>
        </div>

        {loading ? (
          <p className="p-6 text-center text-muted-foreground">
            Loading data...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 text-left">Student</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">State</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Physics</th>
                  <th className="p-4 text-center">Chemistry</th>
                  <th className="p-4 text-center">Maths</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-muted/50 transition"
                  >
                    <td className="p-4 font-medium">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="p-4">{s.email}</td>
                    <td className="p-4">{s.state}</td>

                    <td className="p-4 text-center">
                      {s.latestResult ? (
                        <Badge variant="default">
                          {s.latestResult.totalScore}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not Attempted</Badge>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {s.latestResult?.physics ?? "—"}
                    </td>
                    <td className="p-4 text-center">
                      {s.latestResult?.chemistry ?? "—"}
                    </td>
                    <td className="p-4 text-center">
                      {s.latestResult?.mathematics ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
