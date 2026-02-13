import { useEffect, useState } from "react";
import {
  fetchStudentsPaginated,
  getStudentsCount,
} from "@/lib/adminService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageCursors, setPageCursors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    const init = async () => {
      try {
        const total = await getStudentsCount();
        setTotalPages(Math.ceil(total / PAGE_SIZE));
        await loadPage(1);
      } catch (error) {
        console.error("Init error:", error);
      }
    };
    init();
  }, []);

  /* ================= LOAD PAGE ================= */

  const loadPage = async (pageNumber: number) => {
    try {
      setLoading(true);

      let cursor = null;

      if (pageNumber > 1 && pageCursors[pageNumber - 2]) {
        cursor = pageCursors[pageNumber - 2];
      }

      const res = await fetchStudentsPaginated(cursor);

      setStudents(res.students);

      const updatedCursors = [...pageCursors];
      updatedCursors[pageNumber - 1] = res.lastDoc;

      setPageCursors(updatedCursors);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATS ================= */

  const totalStudents = students.length;

  const scores = students
    .map((s) => s.latestResult?.totalScore)
    .filter((s) => typeof s === "number");

  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const maxScore =
    scores.length > 0 ? Math.max(...scores) : 0;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          CET Mock Test – Student Performance Overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Students On This Page
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {totalStudents}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Average Score
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {avgScore} / 150
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Highest Score
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
              {maxScore} / 150
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm sm:text-base">
            Loading students...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-xs sm:text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 sm:p-4 text-left">Student</th>
                  <th className="p-3 sm:p-4 text-left">Email</th>
                  <th className="p-3 sm:p-4 text-left">State</th>
                  <th className="p-3 sm:p-4 text-center">Total</th>
                  <th className="p-3 sm:p-4 text-center">Physics</th>
                  <th className="p-3 sm:p-4 text-center">Chemistry</th>
                  <th className="p-3 sm:p-4 text-center">Maths</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-muted/50 transition"
                  >
                    <td className="p-3 sm:p-4 font-medium">
                      {s.firstName} {s.lastName}
                    </td>

                    <td className="p-3 sm:p-4 break-all">
                      {s.email}
                    </td>

                    <td className="p-3 sm:p-4">
                      {s.state}
                    </td>

                    <td className="p-3 sm:p-4 text-center">
                      {s.latestResult ? (
                        <Badge variant="default">
                          {s.latestResult.totalScore}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Not Attempted
                        </Badge>
                      )}
                    </td>

                    <td className="p-3 sm:p-4 text-center">
                      {s.latestResult?.physics ?? "—"}
                    </td>

                    <td className="p-3 sm:p-4 text-center">
                      {s.latestResult?.chemistry ?? "—"}
                    </td>

                    <td className="p-3 sm:p-4 text-center">
                      {s.latestResult?.mathematics ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;

          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 &&
              page <= currentPage + 2)
          ) {
            return (
              <Button
                key={page}
                size="sm"
                variant={
                  currentPage === page ? "default" : "outline"
                }
                onClick={() => loadPage(page)}
                className="min-w-[36px]"
              >
                {page}
              </Button>
            );
          }

          if (
            page === currentPage - 3 ||
            page === currentPage + 3
          ) {
            return (
              <span key={page} className="px-2">
                ...
              </span>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
